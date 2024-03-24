import { useEffect } from "react"
import styles from './bodyStyle.module.css'

export const useBodyOverflow = () => {
    useEffect( () => {
        document.body.classList.add(styles['body-overflow'])
        return () => document.body.classList.remove(styles['body-overflow'])
    }, [] )
}