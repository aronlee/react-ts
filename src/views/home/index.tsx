import React, { Component } from 'react'
import './home.scss'

// 规格值
class Category {
  name: string
  constructor(name = '默认规格值') {
    this.name = name
  }
}

// 规格名一行
class CategoryRow {
  name: string
  chidren: Array<Category>
  constructor(name = '默认规格名', children = []) {
    this.name = name
    this.chidren = children
  }
  removeByIndex(index: number) {
    this.chidren.splice(index, 1)
  }
  add(category: Category) {
    this.chidren.push(category)
  }
}

// 所有规格
class CateGoryAll {
  children: Array<CategoryRow>
  constructor() {
    this.children = []
  }
  removeByIndex(index: number) {
    this.children.splice(index, 1)
  }
  add(categoryRow: CategoryRow) {
    this.children.push(categoryRow)
  }
}

// 树形结构节点
class TreeNode {
  category: Category
  children: Array<TreeNode>
  constructor(category: Category, children = []) {
    this.category = category
    this.children = children
  }
  addChild(tn: TreeNode) {
    this.children.push(tn)
  }
}

// 表格渲染二维结构节点
class TableTd {
  // 指向的树节点
  treeNode: TreeNode
  // 叶子节点数，相当于td上的rowSpan
  leafNum: number
  constructor(treeNode: TreeNode) {
    this.treeNode = treeNode
    let count = 0
    const findLeaf = (nodes: Array<TreeNode>) => {
      nodes.forEach((node: TreeNode) => {
        if (node.children && node.children.length) {
          findLeaf(node.children)
        } else {
          count++
        }
      })
    }
    findLeaf(treeNode.children)
    this.leafNum = count
    count = 0
  }
}

interface HomeSates {
  categoryAll: CateGoryAll
  treeNodes: TreeNode
}

export default class Home extends Component {
  state: HomeSates = {
    categoryAll: new CateGoryAll(),
    treeNodes: new TreeNode(new Category('根节点')),
  }
  headNode: TreeNode = new TreeNode(new Category('根节点'))

  componentDidMount() {
    let categoryRow = new CategoryRow()
    categoryRow.add(new Category('A'))
    categoryRow.add(new Category('B'))
    this.state.categoryAll.add(categoryRow)
    categoryRow = new CategoryRow()
    categoryRow.add(new Category('H'))
    categoryRow.add(new Category('I'))
    categoryRow.add(new Category('J'))
    this.state.categoryAll.add(categoryRow)
    categoryRow = new CategoryRow()
    categoryRow.add(new Category('X'))
    categoryRow.add(new Category('Y'))
    categoryRow.add(new Category('Z'))
    this.state.categoryAll.add(categoryRow)
    this.setState({ categoryAll: this.state.categoryAll })
    this.renderTree()
  }

  // 增加规格行
  addRow = () => {
    this.state.categoryAll.add(new CategoryRow())
    this.renderTree()
    this.setState({ categoryAll: this.state.categoryAll })
  }

  // 增加规格值
  addCategory = (categoryRow: CategoryRow) => {
    categoryRow.add(new Category())
    this.renderTree()
    this.setState({ categoryAll: this.state.categoryAll })
  }

  // 移除规格值
  removeCategory = (categoryRow: CategoryRow, index: number) => {
    categoryRow.removeByIndex(index)
    this.renderTree()
    this.setState({ categoryAll: this.state.categoryAll })
  }

  // 绘制树
  renderTree() {
    const { categoryAll } = this.state
    let arrA: Array<TreeNode> = [],
      arrB: Array<TreeNode> = []
    for (let i = categoryAll.children.length - 1; i > -1; i--) {
      for (let j = 0; j < categoryAll.children[i].chidren.length; j++) {
        const node = new TreeNode(categoryAll.children[i].chidren[j])
        arrB.push(node)
        if (i < categoryAll.children.length - 1) {
          node.children = arrA
        }
      }
      arrA = arrB
      arrB = []
    }
    this.headNode.children = arrA
    this.renderTable()
  }
  // 表格二位结构数组
  tableData: Array<Array<TableTd>> = []
  // 渲染表格
  renderTable() {
    this.tableData = []
    let arr: Array<TableTd> = []
    const treeToArr = (nodeList: Array<TreeNode>) => {
      nodeList.forEach(node => {
        arr.push(new TableTd(node))
        if (node.children && node.children.length) {
          treeToArr(node.children)
        } else {
          this.tableData.push(arr)
          arr = []
        }
      })
    }
    treeToArr(this.headNode.children)
    console.log(this.tableData)
  }

  handleChange = (e: any, category: Category) => {
    category.name = e.target.value
    this.setState({ categoryAll: this.state.categoryAll })
  }

  render() {
    const { categoryAll } = this.state
    return (
      <div className="home">
        <div className="home-box">
          {categoryAll &&
            categoryAll.children.map((categoryRow, index) => {
              return (
                <div className="home-row" key={index}>
                  <span>{categoryRow.name}:</span>
                  {categoryRow.chidren.map((category, idx) => {
                    return (
                      <div className="home-ipt-wrap" key={idx}>
                        <input
                          className="home-ipt"
                          name="a"
                          type="text"
                          value={category.name}
                          onChange={e => this.handleChange(e, category)}
                        />
                        <div className="home-btn-close" onClick={() => this.removeCategory(categoryRow, idx)}>
                          x
                        </div>
                      </div>
                    )
                  })}
                  <button className="home-btn-additem" onClick={() => this.addCategory(categoryRow)}>
                    增加一项
                  </button>
                </div>
              )
            })}
        </div>
        <div className="home-btn-addrow-wrap">
          <button className="home-btn-addrow" onClick={this.addRow}>
            增加一行
          </button>
        </div>

        <table className="home-table">
          <tbody>
            {this.tableData.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((col, idx) => {
                    return (
                      <td key={idx} rowSpan={col.leafNum || 1}>
                        {col.treeNode.category.name}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
