import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  FlatList 
} from 'react-native'
import React, {Component} from 'react'
import emoji from '../../../assets/emojis.json'
import { Categories } from './Categories'
import AsyncStorage from '@react-native-async-storage/async-storage'

const charUtf16 = (utf16) => {
  const res = String.fromCodePoint(...utf16.split("-").map(u => "0x" + u))
  return res
}
const charFromEmojiObject = (obj) => charUtf16(obj.emoji)
const emojiByCategory = category => {
  const filter = emoji.filter(e => e.category === category)
  return filter
}
// console.log(emoji.length)
const sortEmoji = list => list.sort((a, b) => a.sort_order - b.sort_order)
const categoryKeys = Object.keys(Categories)

const TabBar = ({ activeCategory, onPress, width }) => {
  const tabSize = width / categoryKeys.length

  return categoryKeys.map(c => {
    const category = Categories[c]
    if (c !== "all")
      return (
        <TouchableOpacity
          key={category.name}
          onPress={() => onPress(category)}
          style={{
            // flex: 1,
            // height: 50,
            borderColor: category === activeCategory ? '#007AFF' : "#EEEEEE",
            borderBottomWidth: 0.3,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              textAlign: "center",
              paddingBottom: 8,
              fontSize: tabSize - 10
            }}
          >
            {category.symbol}
          </Text>
        </TouchableOpacity>
      )
  })
}

const EmojiCell = ({ emoji, colSize, ...other }) => (
  <TouchableOpacity
    style={{
      width: colSize,
      height: colSize,
      alignItems: "center",
      justifyContent: "center"
    }}
    {...other}
  >
    <Text style={{ color: "#FFFFFF", fontSize: colSize - 26 }}>
      {charFromEmojiObject(emoji)}
    </Text>
  </TouchableOpacity>
)

const storage_key = '@emoji-selector:HISTORY'

export default class Emojis extends Component {
  state = {
    category: Categories.people,
    isReady: false,
    history: [],
    emojiList: null,
    colSize: 0,
    width: 0
  }

  //
  //  HANDLER METHODS
  //
  handleTabSelect = category => {
    if (this.state.isReady) {
      if (this.scrollview)
        this.scrollview.scrollToOffset({ x: 0, y: 0, animated: false })
      this.setState({
        category
      })
    }
  }

  handleEmojiSelect = (emoji) => {
    if (this.props.showHistory) {
      
      this.addToHistoryAsync(emoji)
    }
    console.log(emoji)
    this.props.onEmojiSelected(charFromEmojiObject(emoji))
  }


  addToHistoryAsync = async emoji => {
    let history = await AsyncStorage.getItem(storage_key)

    let value = []
    if (!history) {
      // no history
      let record = Object.assign({}, emoji, { count: 1 })
      value.push(record)
    } else {
      let json = JSON.parse(history)
      if (json.filter(r => r.emoji === emoji.emoji).length > 0) {
        value = json
      } else {
        let record = Object.assign({}, emoji, { count: 1 })
        value = [record, ...json]
      }
    }

    AsyncStorage.setItem(storage_key, JSON.stringify(value))
    this.setState({
      history: value
    })
  }

  loadHistoryAsync = async () => {
    let result = await AsyncStorage.getItem(storage_key)
    if (result) {
      let history = JSON.parse(result)
      this.setState({ history })
    }
  }

  //
  //  RENDER METHODS
  //
  renderEmojiCell = ({ item }) => (
    <EmojiCell
      key={item.key}
      emoji={item.emoji}
      onPress={() => this.handleEmojiSelect(item.emoji)}
      colSize={this.state.colSize}
    />
  )

  returnSectionData() {
    const { history, emojiList, category } = this.state
    let emojiData = (function() {
        if (category === Categories.all) {
        //TODO: OPTIMIZE THIS
        let largeList = []
        categoryKeys.forEach(c => {
          const name = Categories[c].name
          const list =
            name === Categories.history.name ? history : emojiList[name]
          if (c !== "all" && c !== "history") largeList = largeList.concat(list)
        })

        return largeList.map(emoji => ({ key: emoji.emoji, emoji }))
      } else {
        let list
        const name = category.name
        if (name === Categories.history.name) {
          list = history
        } else {
          list = emojiList[name]
        }
        return list.map(emoji => ({ key: emoji.emoji, emoji }))
      }
    })()
    return this.props.shouldInclude ? emojiData.filter(e => this.props.shouldInclude(e.emoji)) : emojiData
  }

  prerenderEmojis(callback) {
    let emojiList = {}
    categoryKeys.forEach(c => {
      let name = Categories[c].name
      emojiList[name] = sortEmoji(emojiByCategory(name))
    })

    this.setState(
      {
        emojiList,
        colSize: Math.floor(this.state.width / this.props.columns)
      },
      callback
    )
  }

  handleLayout = ({ nativeEvent: { layout } }) => {
    this.setState({ width: layout.width }, () => {
      this.prerenderEmojis(() => {
        this.setState({ isReady: true })
      })
    })
  }

  //
  //  LIFECYCLE METHODS
  //
  componentDidMount() {
    const { category, showHistory } = this.props
    this.setState({ category })

    if (showHistory) {
      this.loadHistoryAsync()
    }
  }

  render() {
    const {
      columns,
      placeholder,
      showHistory,
      ...other
    } = this.props

    const { category, colSize, isReady } = this.state

    return (
      <View style={styles.frame} {...other} onLayout={this.handleLayout}>
        <View style={styles.tabBar}>
          <TabBar
            activeCategory={category}
            onPress={this.handleTabSelect}
            width={this.state.width} />
        </View>
        <View style={{ flex: 1 }}>
          {isReady &&
            <View style={{ flex: 1 }}>
              <View style={styles.container}>
                <FlatList
                  style={styles.scrollview}
                  contentContainerStyle={{ paddingBottom: colSize }}
                  data={this.returnSectionData()}
                  renderItem={this.renderEmojiCell}
                  horizontal={false}
                  numColumns={columns}
                  keyboardShouldPersistTaps={"always"}
                  ref={scrollview => (this.scrollview = scrollview)}
                  removeClippedSubviews
                />
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}

Emojis.defaultProps = {
  category: Categories.emotion,
  showHistory: true,
  columns: 7,
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    width: "100%",
    // height: 260
  },
  tabBar: {
    flexDirection: "row",
    height: 50,
    alignItems: 'center'
  },
  scrollview: {
    // flex: 1
  },
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  sectionHeader: {
    margin: 8,
    fontSize: 17,
    width: "100%",
    color: "#8F8F8F"
  }
})