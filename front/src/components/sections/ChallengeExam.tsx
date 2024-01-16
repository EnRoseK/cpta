/* eslint-disable react-hooks/exhaustive-deps */
import { IChallengeExam } from '@/interfaces';
import { convertAttachmentUrl, convertDateToString } from '@/utils';
import React, { FC, useEffect, useState } from 'react';
import readXlsxFile, { Row } from 'read-excel-file';

const returnDataRows = async (url: string) => {
  const rows = await fetch(convertAttachmentUrl(url))
    .then((res) => res.blob())
    .then((res) => readXlsxFile(res));

  return rows.filter((row) => row[0]?.toString().length === 10);
};

const tableHeaders = [
  {
    mn: 'Код',
  },
  {
    mn: 'Татварын Англи хэл',
  },
  {
    mn: 'Мэдээллийн технологи',
  },
  {
    mn: '	Санхүү болон ӨУБ',
  },
];

interface ChallengeExamProps {
  challengeExam: IChallengeExam;
  search: string;
  didSearch: boolean;
}

interface ExamResult {
  idNumber: string;
  english: string;
  computer: string;
  finance: string;
}

export const ChallengeExam: FC<ChallengeExamProps> = ({ challengeExam, search, didSearch }) => {
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [displayResults, setDisplayResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    const getRowsFromFiles = async () => {
      let rows: Row[] = [];

      for (const file of challengeExam.results) {
        const res = await returnDataRows(file.excelFile.url);

        rows = [...rows, ...res];
      }

      setExamResults(
        rows.map((row) => ({
          idNumber: row[0]?.toString()?.toUpperCase(),
          english: row[1]?.toString() || '0',
          computer: row[2]?.toString() || '0',
          finance: row[3]?.toString() || '0',
        })),
      );
    };

    getRowsFromFiles();
  }, []);

  useEffect(() => {
    if (didSearch) {
      setDisplayResults(examResults.filter((res) => res.idNumber.toLowerCase() === search.toLowerCase()));
    } else {
      setDisplayResults([]);
    }
  }, [didSearch]);

  return (
    <>
      {challengeExam?.subTitle && (
        <div className='flex items-center justify-end'>
          <span className='mb-10 block max-w-[700px] text-end text-base italic text-description'>
            {challengeExam.subTitle}
          </span>
        </div>
      )}

      {challengeExam?.title && <h3 className='mb-5 text-center text-xl text-dark'>{challengeExam.title}</h3>}

      {challengeExam?.date && (
        <h2 className='mb-10 text-center text-2xl text-dark'>{convertDateToString(new Date(challengeExam.date))}</h2>
      )}

      <div className='relative overflow-x-auto sm:rounded-lg'>
        <table className='w-full text-left text-base text-dark'>
          <thead className='dark:bg-gray-700 bg-gray text-sm uppercase text-dark'>
            <tr>
              {tableHeaders.map((header, index) => {
                return (
                  <th key={index} scope='col' className='px-6 py-3'>
                    {header.mn}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayResults.map((examResult, index) => {
              return (
                <tr
                  key={index}
                  className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'
                >
                  <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-dark '>
                    {examResult.idNumber}
                  </th>
                  <td className='px-6 py-4'>{examResult.english}</td>
                  <td className='px-6 py-4'>{examResult.computer}</td>
                  <td className='px-6 py-4'>{examResult.finance}</td>
                </tr>
              );
            })}

            {displayResults.length === 0 && (
              <tr className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'>
                <th colSpan={7} scope='row' className='whitespace-nowrap px-6 py-4 text-center font-medium text-dark'>
                  {didSearch && 'Илэрц олдсонгүй'}
                  {!didSearch && 'Та өөрийн регистрийн дугаараа оруулан хайлт хийнэ үү!'}
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
