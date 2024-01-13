import { useOnScreen } from '@/hooks/';
import { IStatistic } from '@/interfaces';
import React, { FC, useRef } from 'react';
import { CountUp } from 'use-count-up';

interface StatisticsProps {
  statistics: IStatistic[];
}

export const Statistics: FC<StatisticsProps> = ({ statistics }) => {
  const ref = useRef<HTMLScriptElement>(null);
  const isVisible = useOnScreen(ref);

  if (statistics.length === 0) {
    return <></>;
  }

  return (
    <section ref={ref} className='container mb-15 border-t border-t-dark/[0.07] pt-14 lg:mb-25'>
      <div className='grid grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-4 lg:gap-40'>
        {statistics.map((statistic, index) => {
          return (
            <div key={index} className='text-center'>
              <h5 className='mb-5 text-5xl font-semibold leading-[44px] text-primary'>
                {isVisible ? (
                  <CountUp
                    isCounting
                    end={statistic.stat}
                    duration={6}
                    formatter={(value) =>
                      value.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })
                    }
                  />
                ) : null}
              </h5>
              <span className='block text-small capitalize text-description'>{statistic.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
