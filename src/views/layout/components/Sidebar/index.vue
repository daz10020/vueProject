<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#262b3a"
      text-color="#bfcbd9"
      active-text-color="#ff8000"
    >
      <sidebar-item v-for="(route,index) in routes" :key="index" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar', 'routes'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
