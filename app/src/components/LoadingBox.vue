<template>
  <div>
    
    <!-- Loading box effect -->
    <div id="loadingScreen" :class="{displayClass: !loadingVar}">
      <div id="container">
        <div class="cube">
          <div class="sides">
            <div class="top"></div>
            <div class="right"></div>
            <div class="bottom"></div>
            <div class="left"></div>
            <div class="front"></div>
            <div class="back"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "LoadingBox",
  components: { },

  mounted() {
    this.$root.$on("change-loading", async (msg) => {
        this.loadingVar = msg;    
    });
  },
  
  beforeDestroy() {},

  data: function () {
    return {
        loadingVar: false, 
    };
  },
  methods: {  },

};
</script>

<style scoped>


#loadingScreen{ 
  width: 100%;
  height: 100%;
  position: absolute; 
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: rgba(65, 72, 75, 0.7  ); 
  z-index: 3000;
}
.displayClass { 
  display: none !important;
}
#container div { 
  display: block;
}
#container{ 
  width: 50%;
  margin: 10% auto; 
  height: 20%; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
#container p { 
  font-size: 24px;
  margin-top: 40%;
}
.cube, .cube *{ 
  position: absolute;
  width: 98px;
  height: 98px;
}
.sides{ 
  animation: rotateMe 2s ease infinite;
  animation-delay: 0.8s;
  transform-style: preserve-3d;
  transform: rotateX(-37.5deg) rotateY(45deg);
}
.cube .sides * { 
  box-sizing: border-box;
  border: 0.32rem solid  rgb(159,239,0);
  border-radius: 0.25rem;
  background-color: #686868;
}
.cube .sides .top {
  animation: top-animation 2s ease infinite;
  animation-delay: 0ms;
  transform: rotateX(90deg) translateZ(96px);
  animation-fill-mode: forwards;
  transform-origin: 50% 50%;
}
.cube .sides .right{ 
  animation: right-animation 2s ease infinite;
  animation-delay: 100ms;
  transform: rotateY(90deg) translateZ(96px);
  animation-fill-mode: forwards;
  transform-origin: 50% 50%;
}
.cube .sides .bottom{ 
  animation: bottom-animation 2s ease infinite;
  animation-delay: 0ms;
  transform: rotateX(-90deg) translateZ(96px);
  animation-fill-mode: forwards;
  transform-origin: 50% 50%;  
}
.cube .sides .left{ 
  animation: left-animation 2s ease infinite;
  animation-delay: 100ms;
  transform: rotateY(-90deg) translateZ(96px);
  animation-fill-mode: forwards;
  transform-origin: 50% 50%;
}
.cube .sides .front{ 
  animation: front-animation 2s ease infinite;
  animation-delay: 100ms;
  transform: rotateY(0deg) translateZ(96px);
  animation-fill-mode: forwards;
  transform-origin: 50% 50%;
}
.cube .sides .back{ 
  animation: back-animation 2s ease infinite;
  animation-delay: 100ms;
  transform: rotateY(-180deg) translateZ(96px);
  animation-fill-mode: forwards;
  transform-origin: 50% 50%;
}

@keyframes rotateMe { 
  0% { 
    transform: rotateX(-37.5deg) rotateY(45deg);
  }
  50% { 
    transform: rotateX(-37.5deg) rotateY(405deg);
  }
  100% { 
    transform: rotateX(-37.5deg) rotateY(405deg);
  }
}

@keyframes top-animation { 

  0% { 
    opacity: 1;
    transform: rotateX(90deg) translateZ(100px);
  }
  20% { 
    opacity: 1;
    transform: rotateX(90deg) translateZ(48px);
  }
  70% { 
    opacity: 1;
    transform: rotateX(90deg) translateZ(48px);
  }
  90% { 
    opacity: 1;
    transform: rotateX(90deg) translateZ(100px);
  }
  100% { 
    opacity: 1;
    transform: rotateX(90deg) translateZ(100px);
  }
}

@keyframes right-animation { 

  0% { 
    opacity: 1;
    transform: rotateY(90deg) translateZ(96px);
  }
  20% { 
    opacity: 1;
    transform: rotateY(90deg) translateZ(48px);
  }
  70% { 
    opacity: 1;
    transform: rotateY(90deg) translateZ(48px);
  }
  90% { 
    opacity: 1;
    transform: rotateY(90deg) translateZ(96px);
  }
  100% { 
    opacity: 1;
    transform: rotateY(90deg) translateZ(96px);
  }
}

@keyframes bottom-animation { 

  0% { 
    opacity: 1;
    transform: rotateX(-90deg) translateZ(100px);
  }
  20% { 
    opacity: 1;
    transform: rotateX(-90deg) translateZ(48px);
  }
  70% { 
    opacity: 1;
    transform: rotateX(-90deg) translateZ(48px);
  }
  90% { 
    opacity: 1;
    transform: rotateX(-90deg) translateZ(100px);
  }
  100% { 
    opacity: 1;
    transform: rotateX(-90deg) translateZ(100px);
  }
}

@keyframes left-animation { 

  0% { 
    opacity: 1;
    transform: rotateY(-90deg) translateZ(96px);
  }
  20% { 
    opacity: 1;
    transform: rotateY(-90deg) translateZ(48px);
  }
  70% { 
    opacity: 1;
    transform: rotateY(-90deg) translateZ(48px);
  }
  90% { 
    opacity: 1;
    transform: rotateY(-90deg) translateZ(96px);
  }
  100% { 
    opacity: 1;
    transform: rotateY(-90deg) translateZ(96px);
  }
}

@keyframes front-animation { 

  0% { 
    opacity: 1;
    transform: rotateY(0deg) translateZ(96px);
  }
  20% { 
    opacity: 1;
    transform: rotateY(0deg) translateZ(48px);
  }
  70% { 
    opacity: 1;
    transform: rotateY(0deg) translateZ(48px);
  }
  90% { 
    opacity: 1;
    transform: rotateY(0deg) translateZ(96px);
  }
  100% { 
    opacity: 1;
    transform: rotateY(0deg) translateZ(96px);
  }
}

@keyframes back-animation { 

  0% { 
    opacity: 1;
    transform: rotateY(-180deg) translateZ(96px);
  }
  20% { 
    opacity: 1;
    transform: rotateY(-180deg) translateZ(48px);
  }
  70% { 
    opacity: 1;
    transform: rotateY(-180deg) translateZ(48px);
  }
  90% { 
    opacity: 1;
    transform: rotateY(-180deg) translateZ(96px);
  }
  100% { 
    opacity: 1;
    transform: rotateY(-180deg) translateZ(96px);
  }
}

</style>