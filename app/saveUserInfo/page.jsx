import { useState, useRef, useEffect } from 'react'

import { useUser } from '@/context/UserContext/UserContext'

import { useRouter } from 'next/navigation'

import Hero from '@/hero3/page'

import axios from 'axios'

const saveUserInForm = () => {
  const { user } = useUser()
}
