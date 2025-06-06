"use client";

import { Button } from "@repo/shared/button";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Dropdown, { Option } from "@shared/ui/dropdown";
import { Plus } from "@shared/asset/svg/plus";
import { Minus } from "@shared/asset/svg/minus";
import {
  foreignCategoryOptions,
  humanCategoryOptions,
  majorCategoryOptions,
} from "../model/category";

export const Calculate = () => {
  const Buttons = ["독서", "인성", "전공", "외국어"];
  const [page, setPage] = useState<string>("독서");

  const [bookCount, setBookCount] = useState(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: Option | null;
  }>({
    인성: null,
    전공: null,
    외국어: null,
  });

  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});

  const [idCounts, setIdCounts] = useState<{ [id: number]: number }>({});

  const { control } = useForm();

  const handlePlusWithScore = (page: string) => {
    const selected = selectedOptions[page];
    if (!selected || selected.id == null) return;

    const currentSendCount = categoryCounts[selected.send] ?? 0;
    const currentIdCount = idCounts[selected.id] ?? 0;
    const max =
      parseInt(selected.max_number?.replace(/[^0-9]/g, "") ?? "") || 1;
    const score = parseInt(selected.score?.match(/\d+/)?.[0] ?? "0");
    if (currentIdCount < max) {
      setCategoryCounts((prev) => ({
        ...prev,
        [selected.send]: currentSendCount + 1,
      }));
      setIdCounts((prev) => ({
        ...prev,
        [selected.id!]: currentIdCount + 1,
      }));
      setTotalScore((prev) => prev + score);
    }
  };
  const handleMinusWithScore = (page: string) => {
    const selected = selectedOptions[page];
    if (!selected || selected.id == null) return;

    const score = parseInt(selected.score?.match(/\d+/)?.[0] ?? "0");
    const currentSendCount = categoryCounts[selected.send] ?? 0;
    const currentIdCount = idCounts[selected.id] ?? 0;
    if (currentSendCount > 0 && currentIdCount > 0) {
      setCategoryCounts((prev) => ({
        ...prev,
        [selected.send]: currentSendCount - 1,
      }));
      setIdCounts((prev) => ({
        ...prev,
        [selected.id!]: currentIdCount - 1,
      }));
      setTotalScore((prev) => prev - score);
    }
  };
  return (
    <div className="flex flex-col gap-[1.5rem] w-full h-[30rem]">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-10 mx-4">
        {Buttons.map((item) => (
          <Button
            key={item}
            state="default"
            variant={page === item ? "blue" : "skyblue_hover"}
            label={item}
            onClick={() => setPage(item)}
          />
        ))}
      </div>
      {page === "독서" && (
        <div className="flex flex-col gap-[1.5rem] mx-4">
          <div className="flex w-full gap-[1.25rem]">
            <Button
              state={bookCount === 0 ? "disabled" : "default"}
              variant="skyblue_hover"
              label={
                <Minus
                  className={
                    bookCount === 0
                      ? `text-[#828387] group-hover:text-[#828387]`
                      : `text-[#5E97FC] group-hover:text-[#DFEAFE]`
                  }
                />
              }
              className="group basis-1/6"
              onClick={() => {
                if (bookCount > 0) {
                  setBookCount((prev) => prev - 1);
                  setTotalScore((prev) => prev - 10);
                }
              }}
            />
            <p className="basis-4/6 bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
              {bookCount}
            </p>
            <Button
              state={bookCount === 10 ? "disabled" : "default"}
              variant="skyblue_hover"
              label={
                <Plus
                  className={
                    bookCount === 10
                      ? `text-[#828387] group-hover:text-[#828387]`
                      : `text-[#5E97FC] group-hover:text-[#DFEAFE]`
                  }
                />
              }
              className="group basis-1/6"
              onClick={() => {
                if (bookCount < 10) {
                  setBookCount((prev) => prev + 1);
                  setTotalScore((prev) => prev + 10);
                }
              }}
            />
          </div>
        </div>
      )}
      {["인성", "전공", "외국어"].includes(page) && (
        <div className="flex flex-col gap-[1.5rem] mx-4">
          <Controller
            name={`category-${page}`}
            control={control}
            rules={{ required: "카테고리를 선택해주세요." }}
            render={({ field }) => (
              <Dropdown
                label="카테고리"
                options={
                  page === "인성"
                    ? humanCategoryOptions
                    : page === "전공"
                      ? majorCategoryOptions
                      : foreignCategoryOptions
                }
                value={selectedOptions[page] ?? undefined}
                onChange={(option) => {
                  setSelectedOptions((prev) => ({ ...prev, [page]: option }));
                  field.onChange(option);
                }}
              />
            )}
          />
          <div className="flex w-full gap-[1.25rem]">
            <Button
              state={
                !selectedOptions[page] ||
                (categoryCounts[selectedOptions[page]!.send] ?? 0) === 0
                  ? "disabled"
                  : "default"
              }
              variant="skyblue_hover"
              label={
                <Minus
                  className={
                    !selectedOptions[page] ||
                    (categoryCounts[selectedOptions[page]!.send] ?? 0) === 0
                      ? "text-[#828387] group-hover:text-[#828387]"
                      : "text-[#5E97FC] group-hover:text-[#DFEAFE]"
                  }
                />
              }
              className="group basis-1/6"
              onClick={() => handleMinusWithScore(page)}
            />
            <p className="basis-4/6 bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
              {selectedOptions[page]
                ? (categoryCounts[selectedOptions[page]!.send] ?? 0)
                : 0}
            </p>
            <Button
              state="default"
              variant="skyblue_hover"
              label={
                <Plus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
              }
              className="group basis-1/6"
              onClick={() => handlePlusWithScore(page)}
            />
          </div>
        </div>
      )}
      <div className="flex gap-[1.25rem] w-full mt-auto">
        <p className="basis-full bg-tropicalblue-100 text-titleMedium text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] py-[2.25rem] px-[1.5rem] mx-4">
          {totalScore}점
        </p>
      </div>
    </div>
  );
};
