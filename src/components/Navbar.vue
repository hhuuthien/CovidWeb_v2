<template>
  <div id="nav-main">
    <div id="nav-content">
      <div id="nav-left">
        <img src="../assets/coronavirus.png" alt="Logo" />
        <p>COVID-19</p>
      </div>
      <div id="nav-right">
        <ul>
          <router-link :class="ac[0]" to="/">Việt Nam</router-link>
          <router-link :class="ac[1]" to="/world">Thế giới</router-link>
          <router-link :class="ac[2]" to="/">Vaccine</router-link>
          <router-link :class="ac[3]" to="/admin">
            Admin
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["currentView"],
  data() {
    return {
      ac: ["", "", "", ""],
    };
  },
  watch: {
    currentView: function(view) {
      switch (view) {
        case "/":
          this.ac = ["active", "", "", ""];
          break;
        case "/world":
          this.ac = ["", "active", "", ""];
          break;
        case "/vaccine":
          this.ac = ["", "", "active", ""];
          break;
        case "/admin":
          this.ac = ["", "", "", "active"];
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
#nav-main {
  background-color: #262c7c;
  width: 100%;
  height: 70px;
  font-family: "Nunito", sans-serif;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

#nav-content {
  width: 85%;
  height: 70px;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#nav-left {
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

#nav-left img {
  height: 70px;
  padding: 15px 0;
  cursor: pointer;
}

#nav-left img:hover {
  padding: 10px 0;
  transition: 0.5s ease;
}

#nav-left img:not(:hover) {
  transition: 0.5s ease;
}

#nav-left p {
  margin-left: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

#nav-right ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

#nav-right ul a {
  list-style-type: none;
  padding: 10px 15px;
  margin: 0 5px;
  color: white;
  text-decoration: none;
}

#nav-right ul a:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  transition: 0.5s ease;
}

.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
</style>
