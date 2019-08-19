<template>
  <div class="list">
    <mu-container>
      <mu-row>
        <mu-data-table :columns="columns" :data="movies" class="table">
          <template slot-scope="movie">
            <td>
              <img class="movie-poster" :src="movie.row.poster" />
            </td>
            <td>
              <h3>{{movie.row.title}}</h3>
            </td>
            <td>
              <p class="movie-introduction">{{movie.row.introduction}}</p>
            </td>
            <td class="movie-rating">{{movie.row.rating}}</td>
            <td>
              <mu-button color="purple500" @click="showDetail(movie.row.title)">详细</mu-button>
              <mu-button color="orange500" @click="openEditMovieModal(movie.row)">修改</mu-button>
              <mu-button color="red500" @click="removeMovie(movie.row)">删除</mu-button>
            </td>
          </template>
        </mu-data-table>
        <mu-button fab color="red500" class="add-movie-button" @click="openAddMovieModal">
          <mu-icon value="add"></mu-icon>
        </mu-button>
      </mu-row>
      <mu-row>
        <vodal
          :show="editMovieModal"
          animation="slideDown"
          @hide="editMovieModal = false"
          class="movie-add"
          width="500"
          height="450"
          closeButton="true"
        >
          <mu-text-field v-model="poster" label="海报" label-float=true></mu-text-field>
          <mu-text-field v-model="title" label="名称"></mu-text-field>
          <mu-text-field v-model="introduction" label="简介"></mu-text-field>
          <mu-text-field v-model="rating" label="评分"></mu-text-field>
          <div>
            <mu-button @click="closeModal" color="primary">取消</mu-button>
            <mu-button @click="editMovie" color="orange500">确定</mu-button>
          </div>
        </vodal>
      </mu-row>
       <mu-row>
        <vodal
          :show="addMovieModal"
          animation="slideDown"
          @hide="addMovieModal = false"
          class="movie-add"
          width="500"
          height="450"
          closeButton="true"
        >
          <mu-text-field v-model="poster" label="海报"></mu-text-field>
          <mu-text-field v-model="title" label="名称"></mu-text-field>
          <mu-text-field v-model="introduction" label="简介"></mu-text-field>
          <mu-text-field v-model="rating" label="评分"></mu-text-field>
          <div>
            <mu-button @click="closeModal" color="primary">取消</mu-button>
            <mu-button @click="addMovie" color="orange500">确定</mu-button>
          </div>
        </vodal>
      </mu-row>
    </mu-container>
  </div>
</template>
<script>
import { log } from "util";
import { constants } from 'crypto';
export default {
  created() {
    this.getMovies();
  },
  components: {},
  data() {
    return {
      title: "",
      poster: "",
      rating: null,
      introduction: "",
      movie_id: "",
      movies: [],
      addMovieModal: false,
      editMovieModal: false,
      columns: [
        { title: "电影海报", name: "poster", class: "ld-col-1", width: "20%" },
        { title: "电影名称", name: "title", class: "ld-col-2", width: "10%" },
        {
          title: "简介",
          name: "introduction",
          class: "ld-col-3",
          width: "30%"
        },
        { title: "评分", name: "rating", class: "ld-col-4", width: "10%" },
        { title: "操作", name: "operation", class: "ld-col-5", width: "1000px" }
      ]
    };
  },
  methods: {
    getMovies() {
      this.$http({
        method: "get",
        url: "/api/movie"
      })
        .then(res => {
          console.log(res.data);
          this.movies = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openAddMovieModal() {
      this.addMovieModal = true;
    },
    closeModal() {
      this.addMovieModal = false;
      this.editMovieModal = false;
    },
    addMovie(){
        this.$http.post('/api/movie',{
            title:this.title,
            poster:this.poster,
            introduction:this.introduction,
            rating:this.rating
        })
        .then(res=>{
            console.log(res.data);
            this.addMovieModal = false;
        })
    },
    openEditMovieModal(movie) {
      this.editMovieModal = true
      this.title = movie.title
      this.rating = movie.rating
      this.introduction = movie.introduction
      this.poster = movie.poster
      this.movie_id = movie._id
    },
    editMovie() {
      let id = this.movie_id
      this.$http.put(`/api/movie/${id}`, {
          title: this.title,
          poster: this.poster,
          introduction: this.introduction,
          rating: this.rating,
        })
        .then(res => {
          this.closeModal()
          this.getMovies()
          this.title = ''
          this.rating = null
          this.poster = ''
          this.introduction = ''
          this.movie_id = ''
          console.log(res.data);
        })
        .catch(err => {
            this.closeModal();
            console.log(err);
            })
    } ,
    removeMovie(movie) {
      let id = movie._id
      this.$http.delete(`/api/movie/${id}`)
        .then(res => {
          console.log(res.data)
          this.getMovies()
        })
        .catch(e => console.log(e))
    } ,
    showDetail(title){
        this.$router.push(`/movie/${title}`);
    }
  }
};
</script>
<style lang="less" scoped>
.test {
  height: 100px;
  background-color: red;
}
.list {
  width: 100%;
}
.table {
  width: 100%;
  text-align: center;
}

.movie-poster {
  width: 80%;
  padding: 10px;
}
.add-movie-button {
  text-align: center;
  margin: auto;
}
</style>