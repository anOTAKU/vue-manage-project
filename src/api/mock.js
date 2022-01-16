import Mock from "mockjs";

import homeApi from './mockServer/home'

Mock.mock('/api/home/getData', homeApi)