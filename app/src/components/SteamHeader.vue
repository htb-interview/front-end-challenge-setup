<template>
  <div id="myBody">

    <div id="divLogo">
      <img class="logo" src="@/assets/steamlogo.png" alt="logo" />
      <p>Steam</p>
    </div>

    <div id="divRest">
    
      <div id="title">
        <p>Welcome to fakeSteam!</p>
      </div>

      <div id="categoryMenu">
        <div
          v-for="c in categories"
          :key="c.index"
          class="btnMenu"
          :class="{ selectedBG: categorySelected === c.name }"
          @click="changeCat(c.index)"
        >
          <p>{{ c.title }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {eventBus} from '../main'

export default {
  name: "SteamHeader",
  components: {},

  mounted() {
    if ( this.$store.getters.getCategory == ""){ 
      this.categorySelected = "top_sellers";
      this.$store.dispatch("categoryA", this.categorySelected);
    }else { 
      this.categorySelected = this.$store.getters.getCategory;
    }
  },
  data: function () {
    return {
      categories: [
        { index: 1, title: "New and trending", name: "new_and_trending" },
        { index: 2, title: "Top Sellers", name: "top_sellers" },
        { index: 3, title: "What's Being Played", name: "being_played" },
        { index: 4, title: "Upcoming", name: "upcoming" },
      ],
      categorySelected: "",
    };
  },
  methods: {
    changeCat(tempId) {
      switch (tempId) {
        case 1:
          this.categorySelected = "new_and_trending";
          break;
        case 2:
          this.categorySelected = "top_sellers";
          break;
        case 3:
          this.categorySelected = "being_played";
          break;
        case 4:
          this.categorySelected = "upcoming";
          break;
        default:
          console.log("Error at category selection");
          break;
      }
      this.$store.dispatch("categoryA", this.categorySelected);
      // this.emitMessage(this.categorySelected);
      eventBus.$emit('change-category', this.categorySelected)

    },

    emitMessage(tempMsg) {
      this.$root.$emit("change-category", tempMsg);
    },
  },
};
</script>

<style scoped>
#myBody {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(#00564d, #363636);
  border-bottom: 5px solid #00564d;
}

/* logo start */
#divLogo {
  width: 15%;
  display: block;
  margin: 15px 0px 25px;
}
#divLogo > p {
  font-weight: bold;
}
.logo {
  width: 60px;
  height: 60px;
}
/* logo end */


/* categories start  */
#divRest {
  width: 80%;
  display: block;
}
#title {
  font-weight: bold;
  /* font-size: 44px; */
  margin: 20px auto 20px;
  text-align: start;
  width: 70%;
}
#categoryMenu {
  display: flex;
}
.btnMenu {
  border: 2px solid #00564d;
  width: 20%;
  margin-left: 10px;
  background: #363636;
  border-radius: 25px;
}

.btnMenu:hover {
  font-weight: bold;
  transform: scale(1.05);
}
.selectedBG {
  background: #969696;
  color: #00564d;
}
/* categories end */



@media (min-width:420px) {
  .btnMenu{ 
    font-size: 8px; 
    height: 18px;
    line-height: 18px;
  }

  #title{ font-size: 18px;}

  .logo {
    width: 40px;
    height: 40px;
  }
  
  #divLogo > p { font-size: 14px; }
}

@media (min-width:640px) {
  .btnMenu{ 
    font-size: 10px; 
    height: 25px;
    line-height: 25px;
  }

  #title{ font-size: 26px;}

  .logo {
    width: 60px;
    height: 60px;
  }

  #divLogo > p { font-size: 18px; }

}


@media (min-width:920px) {
  .btnMenu{ 
    font-size: 14px; 
    height: 35px;
    line-height: 35px;
  }

  #title{ font-size: 36px;}

  .logo {
    width: 80px;
    height: 80px;
  }

  #divLogo > p { font-size: 22px; }
}


@media (min-width:1280px) {
  .btnMenu{ 
    font-size: 20px; 
    height: 45px;
    line-height: 45px;
  }

  #title{ font-size: 44px;}

  .logo {
    width: 100px;
    height: 100px;
  }

  #divLogo > p { font-size: 24px; } 
}

</style>