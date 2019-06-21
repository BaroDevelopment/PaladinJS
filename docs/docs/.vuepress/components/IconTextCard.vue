<template>
  <div
    :icon="icon"
    :locked="locked"
    :title="title"
    :hoverColor="hoverColor"
    :description="description"
    :banner="banner"
    :style="cardStyle"
    :class="`Card ${banner ? 'new' : ''}`"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div v-if="locked" class="Locked">
      <div>
        <v-icon>lock</v-icon>
      </div>
      <div >locked</div>
    </div>
    <div class="Left">
      <div class="Icon">
        <img :src="icon">
      </div>
    </div>
    <div class="Right">
      <div >
        <div class="Name">{{title}}</div>
        <div class="Description">{{description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ImageCard",
    data() {
      return {
        hover: false,
      }
    },
    props: {
      icon: {
        type: String,
        required: true,
      },
      banner: {
        type: Boolean,
        required: true,
      },
      locked: {
        type: Boolean,
        required: false,
      },
      title: {
        type: String,
      },
      hoverColor: {
        type: String,
        default: '#000000',
      },
      description: {
        type: String,
        default: '',
      }
    },
    computed: {
      cardStyle() {
        return {
          boxShadow: this.hover && !this.locked ? `0px 0px 14px 4px ${this.hoverColor}` : ''
        };
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .Card.new::after {
    content: "NEW";
    color: #ffffff;
    font-weight: 600;
    font-size: 12px;
    line-height: 26px;
    text-transform: uppercase;
    background: linear-gradient(-120deg, #00c8ff, #1a5fff);
    flex: 0;
    height: 26px;

    transform: rotate(38deg);
    position: absolute;
    right: -27px;
    top: 14px;
    width: 123px;
    text-align: center;
    box-shadow: 0 0 6px #000000;
  }

  .Card {
    cursor: pointer;
    width: 300px;
    margin-right: 50px;
    margin-bottom: 32px;
    min-height: 120px;
    padding: 25px 30px 25px 20px;
    display: flex;
    flex-direction: row;
    background-color: #3e4246;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    border-radius: 3px;
    transition: opacity 175ms ease-out;
    position: relative;
    overflow: hidden;
  }

  .Card .Left {
    width: 60px;
  }

  .Card .Icon {
    width: 100%;
    margin-left: -10px;
    margin-top: 5px;
  }

  .Card .Icon img {
    width: 100%;
  }

  .Card .Right {
    box-flex: 1;
    flex: 1;
  }

  .Card .Name {
    color: #fff;
    font-size: 20px;
    line-height: 1;
    font-weight: 500;
  }

  .Card .Description {
    font-size: 14px;
    color: rgba(255, 255, 255, .62);
    margin-top: 10px;
    line-height: 1.4;
  }

  .Card:hover .Locked {
    opacity: 1;
  }

  .Card .Locked {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background: rgba(0, 0, 0, .9);
    opacity: 0;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 800;
    font-size: 18px;
    text-transform: uppercase;
  }
</style>

