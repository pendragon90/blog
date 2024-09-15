import { useForm } from '@inertiajs/inertia-react';
import { Button, Modal } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { CiCalendar } from 'react-icons/ci';

function MonthPicker({ minDate, maxDate, url }) {
  const [monthOpened, { open: monthOpen, close: monthClose }] = useDisclosure(false);

  const { data, setData, get } = useForm({
    filterMonth: [null, null]
  });

  const handleFilter = () => {
    get(url, {
      preserveState: true,
      preserveScroll: true,
      params: {
        'filterMonth[0]': dayjs(data.filterMonth[0]).format('YYYY-MM-DD'),
        'filterMonth[1]': dayjs(data.filterMonth[1]).format('YYYY-MM-DD'),
      }
    });
    close();
  };

  return (
    <>
      <Modal opened={monthOpened} onClose={monthClose}>
        <div className="flex flex-col gap-5 justify-center items-center">
          <h1 className="text-lg text-center">
            {data.filterMonth[0] ? dayjs(data.filterMonth[0]).format('D MMMM YYYY') : ''} -{' '}
            {data.filterMonth[1] ? dayjs(data.filterMonth[1]).format('D MMMM YYYY') : ''}
          </h1>
          <MonthPickerInput
            leftSection={<CiCalendar className="h-4" />}
            placeholder='Pick Month'
            value={data.filterMonth}
            type="range"
            onChange={(e) => setData('filterMonth', e)}
            minDate={new Date(minDate)}
            maxDate={new Date(maxDate)}
          />
        </div>

        <div className="mt-5">
          <Button
            fullWidth
            leftSection={<CiCalendar className="h-4" />}
            
            onClick={handleFilter}
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <label style={{ cursor: 'pointer' }}   onClick={monthOpen}>
        <span className='text-sm' style={{ display: 'inline-block', marginBottom: '0px', marginRight: '8px' }}>Month Input</span>
        <div className="flex gap-2 items-center p-2 rounded-lg border text-gray-400 cursor-pointer">
          <CiCalendar /> {/* Corrected icon component */}
          <span className='text-sm'>  Filter by Month</span>
        </div>
      </label>
    </>
  );
}

export default MonthPicker;
