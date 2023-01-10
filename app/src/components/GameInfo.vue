<template>
  <div id="myPage">
    <!-- Header with back BTN and Title -->
    <div class="header">
      <div class="backBtn">
        <el-button @click="goBack">Back</el-button>
      </div>
      <p class="gameTitle">{{ this.getTitle }}</p>
    </div>

    <!-- Rest of page body -->
    <div class="myBody" :style="setBackground">
    
      <!-- Containes Photo carousel, movies and game info  -->
      <div class="container">

        <!-- Photo carousel and movies  -->
        <div class="bodyCarousel">

          <div>
            <el-carousel>
              <el-carousel-item v-for="item in this.screenshots" :key="item">
                <img class="imageCarousel" :src="item" alt="game image"/>
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="moviesContainer">
            <p>Movies :</p>
            <div v-for="item in this.movies" :key="item.id" @click="openMovie(item)">
              <img :src="item.thumbnail" class="imgMovie" alt="game movie image" />
            </div>
          </div>

        </div>

        <!-- Game info  -->
        <div class="gameInfos" style="">
          
          <img :src="this.getHeaderImage"  alt="game header image "/>
          <p>{{ this.getShortDescription }}</p>
          
          <p>
            Developers:
            <span v-for="dev in this.getDevelopers" :key="dev" class="highlightMe">
              {{ dev }}
            </span>
          </p>

          <p>
            Publishers:
            <span v-for="pub in this.getPublishers" :key="pub" class="highlightMe">
              {{ pub }}
            </span>
          </p>

          <div class="prices" v-if="this.game != null" >
            <div v-if="this.game.hasOwnProperty('price_overview')">

              <p v-if="this.game.price_overview.hasOwnProperty('discount_percent') && this.game.price_overview.discount_percent != 0" >
                Discount: -{{ this.game.price_overview.discount_percent }}%
              </p>

              <p  v-if="this.game.price_overview.initial_formatted != ''" >Initial Price: {{ this.game.price_overview.initial_formatted }}  </p>
              
              <p>Final Price: {{ this.game.price_overview.final_formatted }}</p>
            
            </div>
          </div>

        </div>

      </div>

      <!-- About this game  -->
      <p id="aboutTitle"> About this game</p>
      <div v-if="this.game != null" id="aboutBody" v-html="this.game.about_the_game"></div>
   
    </div>


    <!-- Movie dialog -->
=    <el-dialog
      :visible.sync="movieDialog" 
      width="40%"
      :before-close="handleClose"
    >
        <div>
            <video width="100%" height="auto" controls autoplay>
                <source :src="this.getMovieVideo" type="video/mp4">
            </video>
        </div>
    </el-dialog>

    <LoadingBox />
  </div>
</template>

<script>
import axios from "axios";
import LoadingBox from "@/components/LoadingBox.vue";

export default {
  name: "GameInfo",
  components: { LoadingBox },

  mounted() {
    this.gameId = this.$store.getters.getGame;
    this.$nextTick(async () => {
      await this.loadGame();
    });

  },
  beforeDestroy() {},

  data: function () {
    return {
      gameId: null,
      game: null,
      screenshots: [],
      movies: [],

      movieDialog: false, 
      movieDisplay: null, 
    };
  },
  methods: {


    
    goBack() {
      this.$store.dispatch("gameA", "");
      this.$router.push("/").catch(() => {});
    },

    async loadGame() {
      this.startLoading();

      try {
        let url = this.$store.getters.getUrl;
        url += "appid=" + this.$store.getters.getGame;

        let res = null;
        res = await axios.get(url);

        if (res == null || res == undefined || res == []) {
          console.log("No results found");
          this.stopLoading();
          return;
        }

        this.game = res.data[0];
        if (this.game.hasOwnProperty("screenshots")) {
          let tempScreenShots = this.game.screenshots;
          tempScreenShots.forEach((pic) => {
            this.screenshots.push(pic.path_full);
          });
        }

        if (this.game.hasOwnProperty("movies")) {
          let tempMovies = this.game.movies;
          tempMovies.forEach((pic) => {
            this.movies.push(pic);
          });
        }

        this.stopLoading();
        return;
      } catch (err) {
        console.log("Error at loading data");
        console.log(err);
        this.stopLoading();
        return;
      }
    },

    // Simple function to trigger loading true and false
    startLoading() {
      this.$root.$emit("change-loading", true);
    },
    stopLoading() {
      this.$root.$emit("change-loading", false);
    },


    // Dialog functions
    openMovie(movie){  
        this.movieDialog =true;
        this.movieDisplay = movie
    },
    handleClose(){ 
        this.movieDisplay = null; 
        this.movieDialog = false;
    },

  },

  computed: {
    getTitle() { 
        return this.game != null ? this.game.name : "";
    }, 
    setBackground() {

      if (this.game == null )
        return "";
      if (this.game.hasOwnProperty('background') == false )
        return ""; 

      return {
        "background-image": "url(" + this.game.background + ")",
        "background-repeat": "no-repeat",
        "background-position": "center",
        "background-size": "cover",
      };
    },  
    getMovieVideo() { 
        return this.movieDisplay != null ? this.movieDisplay.mp4.max : ""; 
    }, 
    getHeaderImage(){ 
      return this.game != null ? this.game.header_image : "";
    }, 
    getShortDescription(){ 
      return this.game != null ? this.game.short_description : ""; 
    }, 
    getDevelopers() { 
      return this.game != null ? this.game.developers : ""
    },
    getPublishers() { 
      return this.game != null ? this.game.publishers : ""
    }
  
  },

};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap");

#myPage {
  width: 100%;
  background-image: linear-gradient(#00564d, #363636);
  border-bottom: 5px solid #00564d;
  height: 100%;
}

/* Header Start */
.header {
  width: 100%;
  display: flex;
  padding: 10px 1px;
  border-bottom: 5px solid #282828;
}
.backBtn {
  width: 10%;
}
.backBtn > .el-button {
  background: #363636;
  color: #00897b;
  border: 2px solid #969696;
  border-radius: 25px;
  margin: 0px auto;
}
.backBtn > .el-button :hover {
  font-weight: bold;
  text-decoration: underline;
}
.gameTitle {
  font-family: "Comfortaa", cursive;
  font-size: 36px;
  width: 80%;
}
/* Header End */

/* Body start */
/* .myBody { }  */
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 50px;
}

/* Carousel images start*/
.bodyCarousel {
  /* width: 60%; */
  margin-left: 15px;
  padding: 10px;
  border: 3px solid #282828;
  border-radius: 15px;
  background: #363636;
}
.imageCarousel {
  max-width: 500px;
  height: auto;
}
.el-carousel__item {
  background: none;
}
/* Carousel images end*/

/* Movies Container start */
.moviesContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.moviesContainer > p {
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  align-self: center;
  color: #00897b;
}
.moviesContainer > div {
  margin: 5px 10px;
  width: fit-content;
  height: auto;
}
.imgMovie {
  /* width: 100px; */
  height: auto;
}
/* Movies container end */

/* Games info Start */
.gameInfos{ 
    /* width: 33%;  */
    text-align: start;
    /* margin-right: 20px; */
}
.gameInfos > img { 
  width: 90%;
  height: auto;
}
.gameInfos > p { 
    text-align: start;
    line-height: 32px;
}
.highlightMe{ 
    font-weight: bold;
    text-decoration: underline;
}
.prices{ 
    width: 80%;
}
.prices > div { 
    display: flex; justify-content: space-between; width: 100%;
}
.prices > div > p { 
    border: 2px solid #282828;
    padding: 10px;
    background: #00897b;
    color: #969696;
    border-radius: 15px;
}
/* Games info end */


/* About this game Start */
#aboutTitle{ 
    font-size: 36px;
    font-weight: bold;
    text-decoration: underline;
    padding: 20px;
}
#aboutBody{ 
    width: 60%;
    text-align: center;
    margin: 0px auto;
}
/* About this game end */




@media (min-width:180px) {
  .imgMovie{ width: 50px; }
  .aboutBody{ width: 95% }
}

@media (min-width:380px) {

  .bodyCarousel{ 
    width: 80%;
    margin: 1px auto;
  }

  .gameInfos{ 
    width: 75%;
    font-size: 16px;
    margin: 1px auto;
    margin-top: 25px;
  }

  .moviesContainer > p { font-size: 16px; }
  .imgMovie{ width: 100px; }
  .aboutBody{ width: 85%; }
}

@media (min-width:920px) {
 
  .bodyCarousel{  width: 55%;}

  .gameInfos{ 
    width: 30%;
    font-size: 14px;
    margin-right: 15px;
  }
}

@media (min-width:1280px) {

  .bodyCarousel{ width: 60%; }

  .gameInfos{ 
    width: 35%;
    font-size: 16px;
    margin-right: 20px;
  }
}

</style>