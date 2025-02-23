import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
    
  return (
    <div>Signup</div>
  )
}

export default Signup