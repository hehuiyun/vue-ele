<template>
  <div class="seller">
    <div>
      <div class="seller-content">
        <div class="instruction">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc border-1px">
            <div class="star-wrapper">
              <star :size="36" :score="seller.score"></star>
            </div>
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2 class="title">起送价</h2>
              <div class="num">{{seller.minPrice}}<span class="unit">元</span></div>
            </li>
            <li class="block">
              <h2 class="title">商家配送</h2>
              <div class="num">{{seller.deliveryPrice}}<span class="unit">元</span></div>
            </li>
            <li class="block special">
              <h2 class="title">平均配送时间</h2>
              <div class="num">{{seller.deliveryTime}}<span class="unit">分钟</span></div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite">
            <i class="icon-favorite" :class="{'active':favorite}"></i>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="bulletin-content">{{seller.bulletin}}</div>
          <ul class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <i class="icon" :class="classMap[item.type]"></i>
              <span class="description">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="pics">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in seller.pics">
                <img :src="pic" width="120" height="120">
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">商家信息</h1>
          <ul class="info-content">
            <li class="info-list" v-for="(item,index) in seller.infos">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from '../star/star';
  import split from '../split/split';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorate', false);
        })()
      };
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      toggleFavorite (event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    created () {
      this.classMap = ['decrease', 'special', 'discount', 'invoice', 'guarantee'];
      if (!this.picScroll) {
        if (this.seller.pics) {
          this.$nextTick(() => {
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * this.seller.pics.length - margin;
            this.$refs.picList.style.width = width + 'px';
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        }
      } else {
        this.picScroll.refresh();
      }
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$el, {click: true});
        });
      } else {
        this.scroll.refresh();
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-content
      .instruction
        padding: 18px
        .title
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
        .desc
          padding: 8px 0 18px 0
          border-1px(rgba(7,17,27,.1))
          .star-wrapper
            margin-right: 8px
            display: inline-block
            vertical-align: middle
          .ratingCount,.sellCount
            font-size: 10px
            color: rgb(77,85,93)
            line-height: 18px
          .ratingCount
            margin-right: 12px
        .remark
          display: flex
          padding-top: 18px
          .block
            flex: 1
            text-align: center
            border-right: 1px solid rgba(7,17,27,0.1)
            .title
              font-size: 10px
              color: rgb(147,153,159)
              line-height: 10px
              margin-bottom: 4px
            .num
              font-size: 24px
              color: rgb( 7,17,27)
              line-height: 24px
              .unit
                font-size: 10px
                color: rgb(77,85,93)
                line-height: 18px

          .special
            border: none
        .favorite
          position absolute
          right 11px
          top 18px
          width 50px
          text-align center
          .icon-favorite
            display block
            margin-bottom 4px
            line-height 24px
            font-size 24px
            width 50px
            color #d4d6d9
            &.active
              color rgb(240,20,20)
          .text
            line-height 10px
            font-size 10px
            color rgb(77,85,93)
      .bulletin
        padding: 18px
        .title
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
        .bulletin-content
          padding: 8px 12px 12px 16px
          font-size: 12px
          color: rgb(240,20,20)
          line-height: 24px
        .supports
          .support-item
            padding: 16px 12px
            border-1px(rgba(7,17,27,0.1))
            .icon
              display: inline-block
              vertical-align: middle
              width: 16px
              height: 16px
              background-repeat: no-repeat
              background-size: 16px 16px
              &.decrease
                bg-image('decrease_4')
              &.discount
                bg-image('discount_4')
              &.guarantee
                bg-image('guarantee_4')
              &.invoice
                bg-image('invoice_4')
              &.special
                bg-image('special_4')
            .description
              display: inline-block
              font-size: 12px
              color: rgb(7,17,27)
              line-height: 16px

      .pics
        padding: 18px
        .title
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
          margin-bottom: 12px
        .pic-wrapper
          width 100%
          overflow hidden
          white-space nowrap /*不这行*/
          .pic-list
            font-size 0
            .pic-item
              display inline-block
              margin-right 6px
              width 120px
              height 90px
              &:last-child
                margin 0
      .info
        padding: 18px
        .title
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
          margin-bottom: 12px
        .info-content
          width: 100%
          .info-list
            width: 100%
            padding: 16px 12px
            border-1px(rgba(7,17,27,0.1))
            font-size: 12px
            color: rgb(7,17,27)
            line-height: 16px


</style>

