import {LOCALSTORAGE} from 'constants/storage'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

export function useAuth() {
	const router = useRouter()
	useEffect(
		() => {
			const token = localStorage.getItem(LOCALSTORAGE.AUTHTOKEN)
			if (!token) {
				router.push('/login')
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	)
}
