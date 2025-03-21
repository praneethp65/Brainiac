import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { Plus } from "../icons/Plus";
import { Share } from "../icons/Share";
import { CreateContentModelStatus } from "../store/atoms/CreateContentModelStatus";
import { ShareBrainModelStatus } from "../store/atoms/ShareBrainModelStatus";
import { CreateContentModal } from "../components/CreateContentModel";
import { ShareBrainModel } from "../components/ShareBrainModel";
import { AccountModel } from "../components/AccountModel";
import { AccountModelStatus } from "../store/atoms/AccountModelStatus";
import { Hamburger } from "../icons/Hamburger";
import { HomeNavbarItems } from "../components/HomeNavbarItems";
import { HomeNavbarItemsStatus } from "../store/atoms/HomeNavbarItemsStatus";
import { BottomBar } from "../components/BottomBar";
import { NotesStatus } from "../store/atoms/NotesStatus";
import { useEffect, useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { NoteProps } from "../types/NoteProps";
import { CardModel } from "../components/CardModel";
import { CurrType } from "../store/atoms/currType";
import { NoNotes } from "../components/NoNotes";
import { useNavigate } from "react-router-dom";
import { authState } from "../store/atoms/authState";

export function Home() {
  const setIsCreateContentModelOpen = useSetRecoilState(
    CreateContentModelStatus
  );
  const setIsShareBrainModelOpen = useSetRecoilState(ShareBrainModelStatus);
  const [IsAccountModelOpen, setIsAccountModelOpen] =
    useRecoilState(AccountModelStatus);
  const setIsHomeNavbarModelOpen = useSetRecoilState(HomeNavbarItemsStatus);
  const currentType = useRecoilValue(CurrType);
  const notes = useRecoilValue(NotesStatus);
  const { fetchNotes } = useNotes();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  const firstLetter = auth.user?.username
    ? auth.user.username.charAt(0).toUpperCase()
    : "";

  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);
      await fetchNotes();
      setIsLoading(false);
    };

    loadNotes();
  }, []);

  const filterNotes = (activeType: string, notes: Array<NoteProps>) => {
    switch (activeType) {
      case "linkedin":
        return notes.filter((note) => note.type[0] === "Linkedin");
      case "youtube":
        return notes.filter((note) => note.type[0] === "Youtube");
      case "twitter":
        return notes.filter((note) => note.type[0] === "X");
      case "pinterest":
        return notes.filter((note) => note.type[0] === "Pinterest");
      case "instagram":
        return notes.filter((note) => note.type[0] === "Instagram");
      case "document":
        return notes.filter((note) => note.type[0] === "Document");
      case "link":
        return notes.filter((note) => note.type[0] === "Links");
      default:
        return notes;
    }
  };

  const filteredNotes = filterNotes(currentType, notes);

  return (
    <div className="flex overflow-y-hidden w-screen h-screen">
      <div className="bg-black shadow-sm rounded-r-3xl">
        <Sidebar />
      </div>
      <div className="w-screen h-screen flex flex-col">
        <div className="justify-between mt-7 hidden lg:flex px-5">
          <div className="text-white font-bold text-2xl items-center mt-[0.3rem]">
            My Notes
          </div>
          <div className="flex gap-3 justify-center items-center">
            <div
              className="text-lg font-thin hover:cursor-pointer text-white font-mono rounded-md hover:text-black"
              onClick={() => navigate("/search")}
            >
              Query Your Brain?
            </div>
            <Button
              variant="secondary"
              startIcon={<Share />}
              text="Share Brain"
              size="md"
              onClick={() => setIsShareBrainModelOpen((prev) => !prev)}
              isLoading={false}
            />
            <Button
              variant="primary"
              startIcon={<Plus />}
              text="Add Content"
              size="md"
              onClick={() => setIsCreateContentModelOpen((prev) => !prev)}
              isLoading={false}
            />
            <div
              className="hover:cursor-pointer"
              onClick={() => setIsAccountModelOpen((prev) => !prev)}
            >
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-white font-medium text-2xl">
                {firstLetter}
              </div>
              {IsAccountModelOpen && (
                <div className="fixed right-14 top-20">
                  <AccountModel />
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="flex lg:hidden justify-between px-5 pt-5"
          onClick={() => {
            setIsHomeNavbarModelOpen(true);
          }}
        >
          <div className="flex justify-center items-center text-white font-bold text-2xl">
            All Notes
          </div>
          <div className="hover:cursor-pointer">
            <Hamburger />
          </div>
        </div>
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center lg:ml-60">
            <div className="bg-white p-6 rounded-2xl flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-300"></div>
              </div>
              <span className="text-white text-lg font-medium">
                Loading Brain...
              </span>
            </div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex justify-center items-center mt-40">
            <NoNotes />
          </div>
        ) : (
          <div className="flex flex-wrap 2xl:gap-14 gap-6 mt-10 lg:mb-10 justify-center items-center sm:mx-14 mb-28 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-300 scrollbar-none sm:scrollbar-thin pt-3 px-2">
            {filteredNotes?.map((note: NoteProps) => (
              <Card
                key={note._id}
                _id={note._id}
                link={note.link}
                type={note.type}
                title={note.title}
                description={note.description}
                userId={note.userId}
                createdAt={note.createdAt}
                canDelete={true}
              />
            ))}
          </div>
        )}
        <BottomBar />
      </div>
      <CreateContentModal />
      <ShareBrainModel />
      <HomeNavbarItems />
      <CardModel />
    </div>
  );
}
