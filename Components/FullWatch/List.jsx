import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
} from "react-native";
import {
  RecyclerListView,
  LayoutProvider,
  DataProvider,
  BaseItemAnimator,
} from "recyclerlistview";
import ListItem from "./ListItem";
const { height, width } = Dimensions.get("window");

const ViewTypes = {
  HEADER: 0,
  LISTITEM: 1,
};

class ItemAnimator implements BaseItemAnimator {
  animateWillMount(atX, atY, itemIndex) {
    //This method is called before the componentWillMount of the list item in the rowrenderer
    //Fill in your logic.
    return undefined;
  }
  animateDidMount(atX, atY, itemRef, itemIndex) {
    //This method is called after the componentDidMount of the list item in the rowrenderer
    //Fill in your logic
    //No return
  }
  animateWillUpdate(fromX, fromY, toX, toY, itemRef, itemIndex): void {
    //This method is called before the componentWillUpdate of the list item in the rowrenderer. If the list item is not re-rendered,
    //It is not triggered. Fill in your logic.
    // A simple example can be using a native layout animation shown below - Custom animations can be implemented as required.
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //No return
  }
  animateShift(fromX, fromY, toX, toY, itemRef, itemIndex): boolean {
    //This method is called if the the props have not changed, but the view has shifted by a certain amount along either x or y axes.
    //Note that, this method is not triggered if the props or size has changed and the animateWillUpdate will be triggered in that case.
    //Return value is used as the return value of shouldComponentUpdate, therefore will trigger a view re-render if true.
    return false;
  }
  animateWillUnmount(atX, atY, itemRef, itemIndex): void {
    //This method is called before the componentWillUnmount of the list item in the rowrenderer
    //No return
  }
}

const getMockData = (dataSet, sortType) => {
  let i,
    key,
    keyVal,
    j,
    arr = dataSet;
  if (sortType === "Symbol") {
    for (i = 1; i < arr.length; i++) {
      key = arr[i].security;
      j = i - 1;
      keyVal = arr[i];
      while (j >= 0 && arr[j].security > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = keyVal;
    }
  } else if (sortType === "Change") {
    for (i = 1; i < arr.length; i++) {
      key = parseFloat(arr[i].perchange);
      j = i - 1;
      keyVal = arr[i];
      while (j >= 0 && parseFloat(arr[j].perchange) < key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = keyVal;
    }
  } else if (sortType === "Trades") {
    for (i = 1; i < arr.length; i++) {
      key = parseFloat(arr[i].tottrades);
      j = i - 1;
      keyVal = arr[i];
      while (j >= 0 && parseFloat(arr[j].tottrades) < key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = keyVal;
    }
  } else {
    arr = dataSet;
  }
  let data = [];
  for (let i = 0; i < arr.length; i++) {
    data.push({
      security: arr[i].security,
      companyname: arr[i].companyname,
      tradeprice: arr[i].tradeprice,
      netchange: arr[i].netchange,
      perchange: arr[i].perchange,
      totvolume: arr[i].totvolume,
    });
  }
  return data;
};

class List extends React.Component {
  constructor(props) {
    super(props);
    let data = getMockData(props.item, props.sortType);

    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this.layoutProvider = new LayoutProvider(
      (i) => {
        if (i < 0) {
          return ViewTypes.HEADER;
        } else {
          return ViewTypes.LISTITEM;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HEADER:
            dim.width = width;
            dim.height = 0;
            break;
          case ViewTypes.LISTITEM:
            dim.width = width;
            dim.height = height * 0.08;
            break;
          default:
            dim.width = width;
            dim.height = 50;
        }
      }
    );
    this.itemAnimator = new ItemAnimator();
    this.recyclerListViewRef = React.createRef();
    this.state = {
      dataProvider: dataProvider.cloneWithRows(data),
      extendedState: {
        selected: {},
      },
      intervalFullWatchId: "",
    };
  }

  setData = (dataArr, sortType) => {
    let data = getMockData(dataArr, sortType);
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this.setState({
      dataProvider: dataProvider.cloneWithRows(data),
    });
  };

  onPressItem = (index) => {
    let extendedState = this.state.extendedState;
    if (index in extendedState.selected) {
      delete extendedState.selected[index];
    } else {
      extendedState.selected[index] = "true";
    }
    this.setState(
      {
        extendedState: extendedState,
      },
      () => {
        // console.log(this.state.extendedState.selected);
      }
    );
  };

  //This method returns the JSX element which should be rendered for each index based on its type. The first parameter specifies the type of      //layout for the current index.The second parameter item gives data of the current index from the dataprovided. The third parameter is the      //index itself. The fourth is the optional extendedstate parameter. Any local state which may need to be stored at the item level is better     //passed in the extendedstate prop. For example, the number of clicks on a list item is something ususally maintained in the item's local       //state. This is however discouraged as the items get reused when they have gone outside the viewport resulting in unexpected behaviors. As     //shown in this implementation, the extendedState prop can be used to store such data at the parent component level and pass it as a prop.      //The list items should also implement the shouldComponentUpdate to prevent unnecessary rendering. Make sure not to change the extendedState    //too many times as it can be expensive.
  renderItem = (type, item, index, extendedState) => {
    if (type === ViewTypes.HEADER) {
      return <View></View>;
    } else {
      let isSelected = index in extendedState.selected ? true : false;
      return (
        <ListItem
          item={item}
          index={index}
          selected={isSelected}
          onPressItem={this.onPressItem}
          navigation={this.props.navigation}
        />
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.item !== this.props.item ||
      prevProps.sortType !== this.props.sortType
    ) {
      this.setData(this.props.item, this.props.sortType);
    }
  }

  render() {
    let renderFooter =
      this.state.dataProvider.getSize() === 0 ? this.renderFooter : null;
    return (
      <View style={styles.rootContainer}>
        <View style={styles.flowRight}>
          <View style={styles.listContainer}>
            <RecyclerListView
              ref={this.recyclerListViewRef}
              rowRenderer={this.renderItem}
              dataProvider={this.state.dataProvider}
              layoutProvider={this.layoutProvider}
              extendedState={this.state.extendedState}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flowRight: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    // padding: 8,
    flex: 1,
  },
  headerStyle: {
    fontSize: 60,
    padding: 10,
  },
  rootContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

export default List;
