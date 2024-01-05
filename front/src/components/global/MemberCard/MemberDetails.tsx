import { FC } from 'react';
import { Button } from '..';
import classNames from 'classnames';

interface MemberDetailsProps {
  closeHandler: () => void;
  show: boolean;
  onAnimationEnd: () => void;
}

export const MemberDetails: FC<MemberDetailsProps> = ({ closeHandler, show, onAnimationEnd }) => {
  return (
    <div className='fixed inset-0 z-[1000] flex items-center justify-center'>
      <div
        className={classNames(' z-[1001] w-[800px] rounded-xl bg-white p-5 shadow-card', {
          'animate-modalIn': show,
          'animate-modalOut': !show,
        })}
        onAnimationEnd={onAnimationEnd}
      >
        <div className='grid w-full grid-cols-2 gap-8'>
          <div className='col-span-1 aspect-[1/1.2] overflow-hidden rounded-lg bg-[#d9d9d9]'></div>

          <div className='col-span-1 flex flex-col justify-between'>
            <div className='space-y-8'>
              <h5 className='text-xl font-bold leading-normal text-dark'>Ядмаагийн МИШИГЛҮНДЭН</h5>
              <p className='text-base italic leading-normal text-description'>
                1971 онд Сангийн яамнаас ажил хөдөлмөрийн гараагаа эхэлж, Үндэсний татварын ерөнхий газарт хэлтэс,
                газрын дарга, дэд дарга, Сургалтын төвийн захирал, Улсын бүртгэлийн албаны дарга, Дэд дарга гэсэн
                албуудыг хашиж санхүү, татварын албанд 41 жил ажилласан бөгөөд шинэ үеийн татварын тогтолцооны боловсон
                хүчнийг бэлтгэх, мэргэшүүлэх үйл хэргийг гардан хэрэгжүүлсэн.
              </p>
            </div>

            <Button variant='gray' onClick={closeHandler}>
              Хаах
            </Button>
          </div>
        </div>
      </div>

      <div
        className={classNames('fixed inset-0 z-[1000] bg-black/50', {
          'animate-fadeIn': show,
          'animate-fadeOut': !show,
        })}
        onClick={closeHandler}
        onAnimationEnd={onAnimationEnd}
      />
    </div>
  );
};
