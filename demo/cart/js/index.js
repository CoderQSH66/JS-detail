/** 商品类 */
class Good {
  constructor(goodinfo) {
    this.data = goodinfo
    this.choose = 0
  }
  /** 添加商品 */
  increase() {
    this.choose++
  }
  /** 移除商品 */
  decrease() {
    this.choose !== 0 && this.choose--
  }
  /** 判断商品是否被选中 */
  isChooseGood() {
    return this.choose
  }
  /** 计算商品价格 */
  getGoodTotal() {
    return this.choose * this.data.price
  }
}

/** 所有商品操作类 */
class UIGood {
  #domsrc = ""
  constructor(goods) {
    this.dom = {
      goodsContainer: document.querySelector(".container"),
      cart: document.querySelector(".tabbar .cart"),
      number: document.querySelector(".tabbar .number"),
      totalPrice: document.querySelector(".tabbar .total .price"),
      deliverPrice: document.querySelector(".tabbar .total .deliver span"),
      pay: document.querySelector(".tabbar .pay"),
      p1Price: document.querySelector(".tabbar .pay .p1 span")
    }
    this.goods = goods.map((good) => new Good(good))
    this.goods.forEach((good, index) => {
      this.#domsrc += `
          <div class="item">
            <div class="img">
              <img src="${good.data.pic}" />
            </div>
            <div class="info">
              <div class="title">${good.data.title}</div>
              <div class="desc">Lorem, ipsum.</div>
              <div class="rate">月销${good.data.sellNubmer} 好评${good.data.favorRate}%</div>
              <div class="operate">
                <div class="price">¥${good.data.price}</div>
                <div class="choose">
                  <i class="iconfont icon-jian" data-index="${index}"></i>
                  <span>${good.choose}</span>
                  <i class="iconfont icon-jia" data-index="${index}"></i>
                </div>
              </div>
            </div>
          </div>
      `
    })
    this.dom.goodsContainer.innerHTML = this.#domsrc
    this.deliver = 30
    this.dom.deliverPrice.textContent = "¥" + this.deliver
    this.dom.p1Price.textContent = "¥" + this.deliver
  }
  /** 添加商品 */
  addGood(index) {
    this.goods[index].increase()
    this.isAddCart(index)
    this.getGoodTotal()
    this.getGoodNumber()
  }
  /** 移除商品 */
  removeGood(index) {
    this.goods[index].decrease()
    this.isAddCart(index)
    this.getGoodTotal()
    this.getGoodNumber()
  }

  /** 是否添加购物车 */
  isAddCart(index) {
    if (this.goods[index].isChooseGood()) {
      this.dom.goodsContainer.children[index].classList.add("active")
    } else {
      this.dom.goodsContainer.children[index].classList.remove("active")
    }
    this.dom.goodsContainer.children[index].querySelector("span").textContent =
      this.goods[index].choose
  }

  /** 计算总价格 */
  getGoodTotal() {
    const totalPrice = this.goods.reduce((total, good) => {
      return total + good.getGoodTotal()
    }, 0)
    const discontPrice = (this.deliver - totalPrice).toFixed(2)
    this.dom.totalPrice.textContent = "￥" + totalPrice.toFixed(2)
    this.dom.p1Price.textContent = "¥" + discontPrice
    discontPrice <= 0
      ? this.dom.pay.classList.add("active")
      : this.dom.pay.classList.remove("active")
  }
  /** 计算总数量 */
  getGoodNumber() {
    const totalNumber = this.goods.reduce((total, good) => {
      return total + good.choose
    }, 0)
    this.dom.number.textContent = totalNumber
    totalNumber
      ? this.dom.cart.classList.add("active")
      : this.dom.cart.classList.remove("active")
  }
}

/** UI操作类 */
class UICart {
  constructor(goods) {
    this.uigood = new UIGood(goods)
    this.dom = {
      outterCart: this.uigood.dom.cart.querySelector(".outter")
    }
    this.cartClientRect = this.dom.outterCart.getBoundingClientRect()
    this.cartCenterPostion = {
      x: this.cartClientRect.x + this.cartClientRect.width / 2 - 10,
      y: this.cartClientRect.y
    }
    this.dom.outterCart.addEventListener("animationend", function () {
      this.classList.remove("jump")
    })
  }
  /** 点击加入购物车 */
  activeAddCart(index) {
    this.uigood.addGood(index)
    this.cartAnimate(index)
  }

  /** 移除购物车 */
  removeCart(index) {
    this.uigood.removeGood(index)
  }

  /** 购物车动画 */
  cartAnimate(index) {
    this.goodJump(index)
  }

  /** 抛物线跳跃 */
  goodJump(index) {
    const goodEle =
      this.uigood.dom.goodsContainer.children[index].querySelector(
        ".choose .icon-jia"
      )
    const goodEleRect = {
      x: goodEle.getBoundingClientRect().x - 10,
      y: goodEle.getBoundingClientRect().y - 20
    }
    // 创建抛物线小球
    const pwxEle = document.createElement("div")
    const iEle = document.createElement("i")
    pwxEle.className = "pwx"
    iEle.className = "iconfont icon-jia"
    // 初始位置
    pwxEle.style.transform = `translateX(${goodEleRect.x}px)`
    iEle.style.transform = `translateY(${goodEleRect.y}px)`
    pwxEle.appendChild(iEle)
    document.body.appendChild(pwxEle)
    // 强行渲染回流
    document.body.clientWidth
    // 结束位置
    pwxEle.style.transform = `translateX(${this.cartCenterPostion.x}px)`
    iEle.style.transform = `translateY(${this.cartCenterPostion.y}px`
    // 动画结束，删除抛物线小球
    pwxEle.addEventListener(
      "transitionend",
      () => {
        pwxEle.remove()
        // 购物车动画
        this.dom.outterCart.classList.add("jump")
      },
      {
        once: true
      }
    )
  }
}
const uicart = new UICart(goods)
uicart.uigood.dom.goodsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("icon-jia")) {
    uicart.activeAddCart(e.target.dataset.index)
  }
  if (e.target.classList.contains("icon-jian")) {
    uicart.removeCart(e.target.dataset.index)
  }
})
