import { create } from "zustand";

const useStore = create( set =>({
    email: '',
    setEmail: (email) => set(state => ({ ...state, email }))
}) )

export default useStore