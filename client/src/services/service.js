import axios from 'axios'


const apiClient = axios.create({
    baseURL: `http://localhost:8000/`,
    withCredentials: false, 
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: 1000,
});

apiClient.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

apiClient.interceptors.response.use(response => {
    return response
    },
    error => {
        if (error.response.status === 403) {
            window.location.href = '/login'
        }
        if (error.response.status === 401) {
            window.location.href = '/login'
        }
        return Promise.reject(error);
    });


class postAPI {

    // POSTS
    static getPosts(){
        return apiClient.get(`feed/getPosts`, );
    }
    static postComment(data){
        return apiClient.post(`comments/postComment`, data);
    }
    static getComments(data){
        return apiClient.post(`comments/getCommentsForId`,data );
    }
    static getPost(id){
        return apiClient.get(`feed/getPost/${id}` );
    }
     static createPost(data){
        return apiClient.post(`feed/createPost`,data);
    }
    static follow(data){
        return apiClient.post(`following/follow`,data);
    }
    static nonFollow(){
        return apiClient.get(`feed/nonFollowing`);
    }

}

export default postAPI