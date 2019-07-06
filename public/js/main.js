var socket = io('//:3000');

const Login = {
    data: function(){
        return{
            username: '',
            password: '',
        }
    }, 
    methods: {
        login: function(event){
            console.log(this.username);
        }
    },
    template: `<div>
        <label>Username : <input v-model="username"></label><br />
        <label>Password : <input v-model="password" type="password"></label><br />
        <button type="button" v-on:click="login">Login</button>
    </div>` 
}
const Person = {
    data: function(){
        return{
            uuid: '',
            name: '',
        }
    }, 
    methods: {
        savePerson: function(event){
            console.log(this.name);
        }
    },
    mounted(){
        socket.on('tap', function(data){
            this.uuid = data.uuid;
        });
    },
    template: `
        <div>
            <label>UUID : <input v-model="uuid"></label><br />
            <label>Name : <input v-model="name"></label><br />
            <button type="button" v-on:click="savePerson">Login</button>
        </div>
    `
}

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/person', component: Person },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
    el: '#app',
    mounted(){
        socket.on('connect', function(){
            console.log("connected");
        });
    },
    router
})
