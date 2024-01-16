/* eslint-disable react-hooks/exhaustive-deps */
import { IGrantRightExam } from '@/interfaces';
import { convertAttachmentUrl, convertDateToString } from '@/utils';
import React, { FC, useEffect, useState } from 'react';
import readXlsxFile, { Row } from 'read-excel-file';

const tableHeaders = [
  {
    mn: 'Бүртгэлийн дугаар',
  },
  {
    mn: 'Харъяалал',
  },
  {
    mn: 'Татварын бүртгэл',
  },
  {
    mn: 'Татварын онол - Мэргэжлийн ёс зүй',
  },
  {
    mn: 'Хууль эрх зүй',
  },
  {
    mn: 'СТОУС-ын Хэрэглээ',
  },
];

const returnDataRows = async (url: string) => {
  const rows = await fetch(convertAttachmentUrl(url))
    .then((res) => res.blob())
    .then((res) => readXlsxFile(res));

  return rows.filter((row) => typeof row[0] === 'number');
};

interface GrantRightsExamProps {
  grantRightsExam: IGrantRightExam;
  search: string;
  didSearch: boolean;
}

interface ExamResult {
  firstName: string;
  lastName: string;
  idNumber: string;
  registrationNumber: string;
  region: string;
  taxRegistration: string;
  taxRegPower: string;
  taxTheory: string;
  taxTheoryPower: string;
  law: string;
  lawPower: string;
  stous: string;
  stousPower: string;
}

export const GrantRightsExam: FC<GrantRightsExamProps> = ({ grantRightsExam, search, didSearch }) => {
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [displayResults, setDisplayResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    const getRowsFromFiles = async () => {
      let rows: Row[] = [];

      for (const file of grantRightsExam.results) {
        const res = await returnDataRows(file.excelFile.url);

        rows = [...rows, ...res];
      }

      setExamResults(
        rows.map((row) => ({
          firstName: row[2]?.toString(),
          lastName: row[1]?.toString(),
          idNumber: row[3]?.toString(),
          registrationNumber: row[4]?.toString(),
          region: row[5]?.toString(),
          taxRegistration: row[6]?.toString(),
          taxRegPower: row[7]?.toString(),
          taxTheory: row[8]?.toString(),
          taxTheoryPower: row[9]?.toString(),
          law: row[10]?.toString(),
          lawPower: row[11]?.toString(),
          stous: row[12]?.toString(),
          stousPower: row[13]?.toString(),
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
      {grantRightsExam?.subTitle && (
        <div className='flex items-center justify-end'>
          <span className='mb-10 block max-w-[700px] text-end text-base italic text-description'>
            {grantRightsExam.subTitle}
          </span>
        </div>
      )}

      {grantRightsExam?.title && <h3 className='mb-5 text-center text-xl text-dark'>{grantRightsExam.title}</h3>}

      {grantRightsExam?.date && (
        <h2 className='mb-10 text-center text-2xl text-dark'>{convertDateToString(new Date(grantRightsExam.date))}</h2>
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
                    {examResult.registrationNumber}
                  </th>
                  <td className='px-6 py-4'>{examResult.region}</td>
                  <td className='px-6 py-4'>
                    {examResult.taxRegistration}
                    {examResult.taxRegPower && Number(examResult.taxRegPower) > 0 && (
                      <sup>{examResult.taxRegPower}</sup>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    {examResult.taxTheory}
                    {examResult.taxTheoryPower && Number(examResult.taxTheoryPower) > 0 && (
                      <sup>{examResult.taxTheoryPower}</sup>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    {examResult.law}
                    {examResult.lawPower && Number(examResult.lawPower) > 0 && <sup>{examResult.lawPower}</sup>}
                  </td>
                  <td className='px-6 py-4'>
                    {examResult.stous}
                    {examResult.stousPower && Number(examResult.stousPower) > 0 && <sup>{examResult.stousPower}</sup>}
                  </td>
                </tr>
              );
            })}

            {displayResults.length === 0 && (
              <tr className='border-b border-b-dark/10 odd:bg-white even:bg-description/10 hover:bg-description/10'>
                <th colSpan={6} scope='row' className='whitespace-nowrap px-6 py-4 text-center font-medium text-dark'>
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
