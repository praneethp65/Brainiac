import Home from "../assets/home.png";
import Home2 from "../assets/homeLgToXl.png";
import Home3 from "../assets/mobileScreen.png";
import { Button } from "./Button";
import { SignupModelStatus } from "../store/atoms/SignupModelStatus";
import { useSetRecoilState } from "recoil";
import { Signup } from "./Signup";

export default function HeroSection() {
  const setIsSignupModelOpen = useSetRecoilState(SignupModelStatus);

  return (
    <div className="flex flex-col gap-20 justify-center mt-60 items-center">
      <div className="flex flex-col gap-5 w-full justify-center items-center">
        <div className="xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-center font-bold text-white">
          Meet your<span className="text-purple-800"> Second Brain</span>
        </div>
        <div className="mt-1 px-4 md:px-2 max-w-2xl mtext-lg text-gray-100 leading-relaxed text-center">
          Effectively store transformative articles, inspiring and memorable
          posts from social media sites like Twitter, Youtube, Linkedin, and
          effortlessly retrieve them easily through the enchaned query AI
          assistance.
        </div>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-4 mt-2">
          <div>
            <Button
              variant="primary"
              text="Tap into your Second Brain"
              size="lg"
              onClick={() => setIsSignupModelOpen(true)}
              isLoading={false}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center relative">
        <div className="absolute inset-0 w-[90%] h-full border-4 border-double border-blue-600 rounded-3xl animate-pulse mx-auto"></div>
        <img
          src={Home}
          className="xl:block hidden w-[90%] h-full border-4 border-transparent rounded-3xl shadow-xl shadow-blue-400/55"
          alt=""
        />
        <img
          src={Home2}
          className="md:block xl:hidden hidden w-[90%] h-full border-4 border-transparent rounded-3xl shadow-xl shadow-blue-400/55"
          alt=""
        />
        <img
          src={Home3}
          className="block md:hidden w-[90%] h-full border-4 border-transparent rounded-3xl shadow-xl shadow-blue-400/55"
          alt=""
        />
      </div>
      <Signup />
    </div>
  );
}
