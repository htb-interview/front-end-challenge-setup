<template>
  <div id="myBody">

    <!-- Search div  -->
    <div id="searchDiv">
      <input v-model="input" type="text" id="inputField" placeholder="Search game by title"/>
      <el-button id="searchBtn" icon="el-icon-search" circle @click="searchGame"></el-button>
    </div>

    <!-- Div with all the game cards  -->
    <div class="cardStack">
      <div v-for="g in currentGames" :key="g.id" class="gameCard">
        
        <!-- Game image   -->
        <div class="gameImg">
          <img class="logo" :src="g.header_image" alt="game header image" />
        </div>

        <!-- Game title  -->
        <div class="gameInfos">
          <div class="gameTitle">
            <p @click="openGame(g)">{{ g.name }}</p>
          </div>

          <div class="gameExtras">
            <div class="left">
              <!-- Game supported platforms -->
              <div class="os">
                <img
                  class="logo"
                  v-if="g.platforms.linux === true"
                  src="@/assets/linux.png"
                  alt="linux logo"
                />
                <img
                  class="logo"
                  v-if="g.platforms.mac === true"
                  src="@/assets/mac.png"
                  aria-labelledby="mac logo"
                />
                <img
                  class="logo"
                  v-if="g.platforms.windows === true"
                  src="@/assets/windows.png"
                  alt="windows logo"
                />
              </div>

              <!-- Game categories -->
              <div class="categories">
                <el-tag
                  type="info"
                  effect="dark"
                  v-for="cat in g.categories"
                  :key="cat"
                  >{{ cat }}</el-tag
                >
              </div>
            </div>


            <div class="right">
              <!-- Discount -->
              <div v-if="g.price_overview.length != 0" class="discountDiv">
                <div
                  v-if="g.price_overview.discount_percent > 0"
                  class="discount"
                >
                  <p>-{{ g.price_overview.discount_percent }}%</p>
                </div>
              </div>

              <!-- Initial and final price  -->
              <div class="prices" v-if="g.price_overview.length != 0">
                <div class="initial">
                  <p>{{ g.price_overview.initial_formatted }}</p>
                </div>
                <div>
                  <p>{{ g.price_overview.final_formatted }}</p>
                </div>
              </div>

            </div>

          </div> <!-- gameExtras div end  -->


        </div>  <!-- gameInfos div end  -->

      </div>  <!-- gameCard div end  -->

    </div>
  </div>
</template>

<script>
import {eventBus} from '../main'
import axios from "axios";

export default {
  name: "SteamBody",
  components: {},

  created(){ 
    eventBus.$on('change-category',async (cat) => {
      await this.loadData();
    });
  },
  async mounted() {
    await this.loadData();
  },

  data: function () {
    return {
      currentGames: [],
      input: "",
      totalGames: [],

      previous_cat: "",
      loadingVar: false,
    };
  },
  methods: {
 

    // If gameId = "" then return url for category selected else return url for certain id
    getUrl(gameId) {
      console.log(this.$store.getters.getCategory)
      let url = this.$store.getters.getUrl;
      if (gameId === "") {
        url += "tab=" + this.$store.getters.getCategory;
      } else {
        url += "appid=" + gameId;
      }
      return url;
    },

    // Simple function to trigger loading true and false
    startLoading() {
      this.loadingVar = true;
      this.$root.$emit("change-loading", true);
    },
    stopLoading() {
      this.loadingVar = false;
      this.$root.$emit("change-loading", false);
    },

    // Function to store game/ids for each game in this category
    storeGameNames(results) {
      this.totalGames = [];
      results.forEach((game) => {
        let temp = {
          _id: game._id,
          name: game.name,
        };
        this.totalGames.push(temp);
      });
    },

    // Function that loads data for category selection
    async loadData() {
      if (this.loadingVar) {
        console.log("still loading, return");
        return;
      }

      this.startLoading();
      this.currentGames = [];
      this.totalGames = [];

      try {
        let url = this.getUrl("");
        let res = null;
        res = await axios.get(url);

        if (res == null || res == undefined || res == []) {
          console.log("No results found");
          this.stopLoading();
          return;
        }

        this.storeGameNames(res.data);
        this.handleData(res.data);
        this.stopLoading();
        return;

      } catch (err) {
        console.log("Error at loading data");
        console.log(err);
        this.stopLoading();
        return;
      }
    },

    // Function when a game title is clicked - opens game info 
    openGame(game) {
      this.$store.dispatch("gameA", game._id);
      this.$router.push("/about").catch(() => {});
    },

    // Function that handles data for displaying games
    handleData(tempData) {
      this.currentGames = [];
      let maxLimit = tempData.length > 10 ? 10 : tempData.length;
      for (let i = 0; i < maxLimit; i++) {
        let temp = tempData[i];

        let _id = temp.hasOwnProperty("_id") ? temp._id : "";
        let name = temp.hasOwnProperty("name") ? temp.name : "";
        let header_image = temp.hasOwnProperty("header_image") ? temp.header_image : "";
        let platforms = temp.hasOwnProperty("platforms") ? temp.platforms : "";
        let price_overview = temp.hasOwnProperty("price_overview") ? temp.price_overview : "";

        let categories;
        if (temp.hasOwnProperty("categories")) {
          categories = [];
          temp.categories.forEach((c) => {
            if (categories.length < 3 && c.description.length < 15)
              categories.push(c.description);
          });
        } else {
          categories = "";
        }

        this.currentGames.push({
          '_id': _id,
          'name': name,
          'header_image': header_image,
          'platforms': platforms,
          'price_overview': price_overview,
          'categories': categories,
        });
      }
    },

    async searchGame(){ 
      this.startLoading(); 

      // Search for game only if 3 or more characters given 
      let inputSearch = this.input.trim().toLowerCase();
      if (inputSearch.length<3){
        console.log('more input');
        this.stopLoading();
        return;
      }

      // Search totalGames for titles that match and keep the ids
      let tempIds = [];
      this.totalGames.forEach( (el) => {
        let temp = el.name.toLowerCase(); 
        if (temp.includes(inputSearch)){
          tempIds.push(el._id);
        }
      })

      try{ 
        
        // For each id get data and store them to an array
        let tempResults = []; // is the array with the data 
        for( let i=0; i< tempIds.length; i++) { 
          
          let url = this.getUrl(tempIds[i]);
          let res = await axios.get(url);

          if (res == null || res == undefined || res == []) {
            console.log("No results found");
            continue;
          }

          if (res.data.length == 0 ){ 
            console.log('zero results'); 
            continue;
          }

          tempResults.push(res.data[0]); 
        }

        this.handleData(tempResults);
        this.stopLoading();
        this.input = "";
        return;

      }catch(err){ 
        console.log(err)
        this.stopLoading();
        return; 
      }
    }

  },
};
</script>

<style scoped>
#myBody {
  width: 100%;
  display: block;
}

/* Search start  */
#searchDiv {
  width: 30%;
  display: flex;
  margin: 20px auto;
  align-items: center;
}
#inputField {
  width: 90%;
  background: #282828;
  border-bottom: 3px solid #00897b;
  line-height: 24px;
  text-align: center;
  color: #00897b;
}
#searchBtn {
  background: #282828;
  color: #00897b;
  border: 2px solid #00897b;
  margin-left: 10px;
}
/* Search end  */


/* Game cards body start */
.cardStack {
  display: flex;
  width: 95%;
  margin: 20px auto;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.gameCard {
  border: 2px solid #969696;
  border-radius: 0px 20px 20px 0px;
  color: #00897b;
  background: #282828;
  margin: 10px;
  font-size: 20px;
  display: flex;
}

/* Game image start  */
.gameImg {
  width: 120px;
  height: 120px;
}
.gameImg > img {
  width: 120px;
  height: 120px;
}
.logo {
  width: 20px;
  height: 20px;
}
/* Game image end */


.gameInfos {
  display: block;
  width: calc(100% - 130px);
  margin-left: 5px;
  margin: 10px;
}
.gameTitle {
  width: 95%;
  margin-left: 10px;
  text-align: start;
  height: 45%;
}
.gameTitle :hover {
  text-decoration: underline;
  font-weight: bold;
}
.gameExtras {
  display: flex;
  width: 100%;
  font-size: 16px;
  justify-content: space-evenly;
}

/* Left div start */
.left {
  width: 65%;
  display: block;
}
.os {
  width: 90%;
  display: flex;
  margin-left: 5px;
}
.categories {
  display: flex;
  flex-wrap: wrap;
}
.categories > .el-tag {
  width: fit-content;
  height: 15px;
  line-height: 12px;
  font-size: 12px;
  margin-right: 5px;
  margin-top: 5px;
}
/* Left div ends   */

/* Right div starts*/
.right {
  width: 35%;
  display: flex;
  justify-content: space-between;
}
.discountDiv{ 
  width: 35%;
}
.discount {
  width: 100%;
  background: #00897b;
  color: #282828;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
}
.discount > p {
  align-self: center;
}
.prices {
  width: 60%;
  font-size: 14px;
}
.initial {
  font-size: 10px;
  text-decoration: line-through;
}
/* Right div ends */

/* Game cards body end */
@media (min-width: 320px){ 
  .gameCard {  width: 90%; }
}

@media (min-width:640px) {
  .gameCard { width: 70%; }
}
@media (min-width:920px) {
  .gameCard { width: 45%;  }
}
@media (min-width:1280px) {
  .gameCard {  width: 31%;  }
} 

</style>