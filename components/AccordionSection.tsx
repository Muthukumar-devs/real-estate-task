"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  MOCK_SOLUTIONS,
  TailoredSolution,
} from "@/data/mockData";

interface AccordionSectionProps {
  onOpenConsultation: () => void;
}

export default function AccordionSection({
  onOpenConsultation,
}: AccordionSectionProps) {
  const [openSolutionId, setOpenSolutionId] =
    useState<string>("");

  const toggleSolution = (id: string) => {
    setOpenSolutionId((current) =>
      current === id ? "" : id
    );
  };

  return (
    <section
      id="solutions"
      className="
        relative
        overflow-hidden
        bg-[#111215]
        px-4
        py-24
        text-white
        sm:px-6
        sm:py-32
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
        "
      >
        {/* =====================================================
            MAIN LAYOUT
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-14
            lg:grid-cols-12
            lg:gap-20
          "
        >
          {/* ===================================================
              LEFT SIDE
              STATIC CONTENT
          =================================================== */}

          <div
            className="
              lg:sticky
            
              lg:col-span-5
            "
          >
            {/* Eyebrow */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-white
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-neutral-400
                  sm:text-xs
                "
              >
                End-to-End Asset Advisory
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                max-w-xl
                text-3xl
                font-light
                leading-[1.12]
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-6xl
              "
            >
              Tailored Solutions
              <br />
              for Your Real Estate
              <br />
              Needs
            </motion.h2>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.8,
                delay: 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mt-6
                max-w-md
                text-sm
                font-light
                leading-relaxed
                text-neutral-400
                sm:text-base
              "
            >
              From macroeconomic predictive modeling
              to Golden Visa expedited acquisition and
              DIFC asset structuring, we orchestrate every
              dimension of your UAE holdings.
            </motion.p>

            {/* Explore More */}

            <motion.button
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.8,
                delay: 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={onOpenConsultation}
              className="
                mt-8
                inline-flex
                cursor-pointer
                items-center
                gap-3
                rounded-full
                bg-white
                px-7
                py-3.5
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-black
                shadow-xl
                transition-colors
                hover:bg-neutral-200
              "
            >
              <span>
                Explore More
              </span>

              <ArrowRight
                className="
                  h-4
                  w-4
                "
              />
            </motion.button>
          </div>

          {/* ===================================================
              RIGHT SIDE
              ANIMATED ACCORDION
          =================================================== */}

          <div
            className="
              lg:col-span-7
            "
          >
            {/*

              IMPORTANT:

              items-end keeps the RIGHT EDGE of every
              accordion aligned.

              Each card then grows from:
              
                  RIGHT  →  LEFT

            */}

            <div
              className="
                flex
                flex-col
                items-end
                gap-4
              "
            >
              {MOCK_SOLUTIONS.map(
                (
                  solution: TailoredSolution,
                  index: number
                ) => {
                  const isOpen =
                    openSolutionId ===
                    solution.id;

                  return (
                    <motion.div
                      key={solution.id}

                      

                      initial={{
                        opacity: 0,
                        
                        width: "10%",
                      }}

                      whileInView={{
                        opacity: 1,
                       
                        width: "85%",
                      }}

              

                      transition={{
                        duration: 1.05,
                        delay: index * 0.18,
                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }}

                      style={{
                        transformOrigin:
                          "right center",
                      }}

                      className="
                        relative
                        w-full
                        will-change-transform
                        sm:w-[90%]
                        lg:w-[82%]
                      "
                    >
                      {/* =======================================
                          CARD
                      ======================================= */}

                      <motion.div
                        layout
                        transition={{
                          layout: {
                            duration: 0.65,
                            ease: [
                              0.16,
                              1,
                              0.3,
                              1,
                            ],
                          },
                        }}
                        className={`
                          group
                          relative
                          overflow-hidden
                          bg-white
                          text-black
                          shadow-[0_15px_40px_rgba(0,0,0,0.15)]
                          ${
                            isOpen
                              ? "rounded-[2rem]"
                              : "rounded-full"
                          }
                        `}
                      >
                        {/* =====================================
                            HEADER
                        ===================================== */}

                        <motion.div
                          onClick={() =>
                            toggleSolution(
                              solution.id
                            )
                          }
                          whileHover={{
                            backgroundColor:
                              isOpen
                                ? "#ffffff"
                                : "#f7f7f7",
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="
                            relative
                            flex
                            min-h-[78px]
                            cursor-pointer
                            items-center
                            gap-3
                            p-2
                            pr-3
                            select-none
                            sm:min-h-[84px]
                            sm:gap-4
                            sm:p-2.5
                            sm:pr-4
                          "
                        >
                          {/* =================================
                              IMAGE
                          ================================= */}

                          <div
                            className="
                              relative
                              h-14
                              w-14
                              shrink-0
                              overflow-hidden
                              rounded-full
                              border
                              border-black/10
                              bg-neutral-100
                              sm:h-18
                              sm:w-18
                            "
                          >
                            <motion.div
                              initial={{
                                opacity: 0,
                                scale: 1.08,
                              }}
                              whileInView={{
                                opacity: 1,
                                scale: 1,
                              }}
                              viewport={{
                                once: true,
                              }}
                              transition={{
                                duration: 0.8,
                                delay:
                                  0.25 +
                                  index * 0.18,
                                ease: [
                                  0.16,
                                  1,
                                  0.3,
                                  1,
                                ],
                              }}
                              className="
                                absolute
                                inset-0
                              "
                            >
                              <Image
                                src={
                                  solution.thumbnail
                                }
                                alt={
                                  solution.title
                                }
                                fill
                                sizes="
                                  (max-width: 640px) 56px,
                                  64px
                                "
                                className="
                                  object-cover
                                "
                              />
                            </motion.div>

                            {/* Image hover zoom */}

                            <motion.div
                              className="
                                absolute
                                inset-0
                                bg-black/0
                                transition-colors
                                duration-300
                                group-hover:bg-black/5
                              "
                            />
                          </div>

                          {/* =================================
                              TITLE
                          ================================= */}

                          <motion.div
                            initial={{
                              opacity: 0,
                              x: 25,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.7,
                              delay:
                                0.38 +
                                index * 0.18,
                              ease: [
                                0.16,
                                1,
                                0.3,
                                1,
                              ],
                            }}
                            className="
                              min-w-0
                              flex-1
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <span
                                className="
                                  truncate
                                  font-light max-md:text-xl text-4xl
                                  tracking-tight
                                  text-black
                                  
                                "
                              >
                                {
                                  solution.title
                                }
                              </span>

                              <span
                                className="
                                  shrink-0
                                  text-[8px]
                                  font-medium
                                  text-neutral-400
                                "
                              >
                                {
                                  solution.number
                                }
                              </span>
                            </div>

                            {/* Subtitle */}

                            {/* <motion.span
                              initial={{
                                opacity: 0,
                              }}
                              whileInView={{
                                opacity: 1,
                              }}
                              viewport={{
                                once: true,
                              }}
                              transition={{
                                duration: 0.5,
                                delay:
                                  0.52 +
                                  index * 0.18,
                              }}
                              className="
                                mt-0.5
                                hidden
                                truncate
                                text-xs
                                text-neutral-500
                                sm:block
                              "
                            >
                              {
                                solution.subtitle
                              }
                            </motion.span> */}
                          </motion.div>

                          {/* =================================
                              ARROW
                          ================================= */}

                          <motion.div
                            animate={{
                              rotate: isOpen
                                ? 180
                                : 0,
                              scale: isOpen
                                ? 1.05
                                : 1,
                            }}
                            transition={{
                              duration: 0.45,
                              ease: [
                                0.16,
                                1,
                                0.3,
                                1,
                              ],
                            }}
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              text-neutral-700
                            "
                          >
                            <ChevronDown
                              className="
                                h-5
                                w-5
                                stroke-[1.5]
                              "
                            />
                          </motion.div>
                        </motion.div>

                        {/* =====================================
                            EXPANDABLE CONTENT
                        ===================================== */}

                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen
                              ? "auto"
                              : 0,
                            opacity: isOpen
                              ? 1
                              : 0,
                          }}
                          transition={{
                            height: {
                              duration: 0.55,
                              ease: [
                                0.16,
                                1,
                                0.3,
                                1,
                              ],
                            },
                            opacity: {
                              duration: 0.3,
                            },
                          }}
                          className="
                            overflow-hidden
                          "
                        >
                          <div
                            className="
                              border-t
                              border-black/5
                              px-6
                              pb-7
                              pt-5
                              sm:px-8
                            "
                          >
                            {/* Description */}

                            <motion.p
                              initial={{
                                opacity: 0,
                                y: 10,
                              }}
                              animate={
                                isOpen
                                  ? {
                                      opacity: 1,
                                      y: 0,
                                    }
                                  : {
                                      opacity: 0,
                                      y: 10,
                                    }
                              }
                              transition={{
                                duration: 0.45,
                                delay: 0.08,
                              }}
                              className="
                                max-w-xl
                                text-xs
                                font-normal
                                leading-relaxed
                                text-neutral-600
                                sm:text-sm
                              "
                            >
                              {
                                solution.description
                              }
                            </motion.p>

                            {/* Features */}

                            <div
                              className="
                                mt-5
                                space-y-2
                              "
                            >
                              {solution.features.map(
                                (
                                  feature,
                                  featureIndex
                                ) => (
                                  <motion.div
                                    key={
                                      featureIndex
                                    }
                                    initial={{
                                      opacity: 0,
                                      x: -12,
                                    }}
                                    animate={
                                      isOpen
                                        ? {
                                            opacity: 1,
                                            x: 0,
                                          }
                                        : {
                                            opacity: 0,
                                            x: -12,
                                          }
                                    }
                                    transition={{
                                      duration: 0.4,
                                      delay:
                                        0.12 +
                                        featureIndex *
                                          0.06,
                                      ease: [
                                        0.16,
                                        1,
                                        0.3,
                                        1,
                                      ],
                                    }}
                                    className="
                                      flex
                                      items-center
                                      gap-2
                                      text-xs
                                      text-neutral-800
                                    "
                                  >
                                    <CheckCircle2
                                      className="
                                        h-3.5
                                        w-3.5
                                        shrink-0
                                        text-black
                                      "
                                    />

                                    <span>
                                      {feature}
                                    </span>
                                  </motion.div>
                                )
                              )}
                            </div>

                            {/* CTA */}

                            <motion.button
                              initial={{
                                opacity: 0,
                                y: 12,
                              }}
                              animate={
                                isOpen
                                  ? {
                                      opacity: 1,
                                      y: 0,
                                    }
                                  : {
                                      opacity: 0,
                                      y: 12,
                                    }
                              }
                              transition={{
                                duration: 0.5,
                                delay: 0.3,
                                ease: [
                                  0.16,
                                  1,
                                  0.3,
                                  1,
                                ],
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenConsultation();
                              }}
                              whileHover={{
                                scale: 1.04,
                              }}
                              whileTap={{
                                scale: 0.97,
                              }}
                              className="
                                mt-6
                                inline-flex
                                cursor-pointer
                                items-center
                                gap-2
                                rounded-full
                                bg-black
                                px-5
                                py-2.5
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-white
                              "
                            >
                              <span>
                                Consult Advisory Lead
                              </span>

                              <ArrowRight
                                className="
                                  h-3.5
                                  w-3.5
                                "
                              />
                            </motion.button>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}