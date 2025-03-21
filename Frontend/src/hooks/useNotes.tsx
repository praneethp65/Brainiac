import axios from "axios";
import { useSetRecoilState } from "recoil";
import { NotesStatus } from "../store/atoms/NotesStatus";
import { URL } from '../utils/contants'

export function useNotes(){
    const setNotes = useSetRecoilState(NotesStatus);

    async function fetchNotes() {
        try {
            const response = await axios.get(
                `${URL}/content`,
                {
                    headers: {
                        authorization: `${localStorage.getItem('authToken')}`
                    }
                }
            )
            setNotes(response.data.content);                           
        }
        catch (err: any) {
            console.log(`Error while fetching notes, ${err}`)
        }
    }
    return { fetchNotes };
}