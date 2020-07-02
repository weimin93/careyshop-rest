<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/favorites">favorites</router-link> |
      <router-link to="/history">history</router-link>
    </div>
    <router-view/>
  </div>
</template>
