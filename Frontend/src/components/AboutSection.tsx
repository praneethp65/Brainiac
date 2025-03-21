import { Brain } from "../icons/Brain";
import { Lightbulb } from "../icons/LightBulb";
import { Users } from "../icons/User";
import { Zap } from "../icons/Zap";
import { forwardRef } from "react";

interface AboutSectionProps {}

export const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  function AboutSection(_, ref) {
    return (
      <section ref={ref} className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-purple-800 rounded-lg mb-4">
              <Brain />
            </div>
            <h2 className="text-4xl font-bold text-purple-800 mb-4">
              About Brainiac
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              The ultimate place to store everything that matters.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="space-y-6 lg:max-w-md">
              <h3 className="text-3xl font-bold text-purple-800"> Vision</h3>
              <p className="text-white leading-relaxed text-lg">
                Discover a unified solution that lets you store everything in
                one centralized hub, eliminating the need to scatter your data
                across multiple platforms.
              </p>
              <p className="text-white leading-relaxed text-lg">
                With AI-driven query assistance and intelligent smart tagging,
                you can effortlessly retrieve what you need, making it the
                ultimate tool for maintaining organization in a cluttered
                digital world.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                What we offer
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-pink-200 flex items-center justify-center">
                      <Lightbulb />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      Knowledge at Your Fingertips
                    </h4>
                    <p className="text-black">
                      Your information is easily accessible and well-organized,
                      enabling you to discover new connections and spark fresh
                      ideas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
                      <Users />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      Built for People
                    </h4>
                    <p className="text-black">
                      Design is inspired by understanding how people naturally
                      save and retrieve information, ensuring our solutions work
                      with real-world behaviors.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center">
                      <Zap />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      Effortless Integration
                    </h4>
                    <p className="text-black">
                      The Knowledge collection blends seamlessly into your
                      workflow—becoming an intuitive part of your process, not
                      just another tool to use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);
