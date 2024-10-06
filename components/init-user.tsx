'use client';

import { useEffect, useRef } from "react";
import { useUser } from "@/lib/store/user";

import { UserProp } from "@/lib/types/user-prop";


function InitUser({ user }: UserProp) {
	const userInitiated = useRef(false);

	const setUser = useUser(state => state.setUser);


	useEffect(() => {
		if (!userInitiated.current && user) {
			setUser(user);
			userInitiated.current = true;
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <></>
}

export default InitUser;