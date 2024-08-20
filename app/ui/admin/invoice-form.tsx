'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError } from 'react-hook-form';
import { z } from 'zod';
import { InvoiceSchema } from '@/app/lib/zod-schemas';

type FormValues = z.infer<typeof InvoiceSchema>;

export default function InvoiceForm({ registrationNumber }: { registrationNumber: string }) {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(InvoiceSchema),
    mode: 'onTouched',
    defaultValues: {
        invoice_number: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/send-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationNumber,
          invoiceNumber: data.invoice_number
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Ticket was sent successfully');
        window.location.href = '/admin/uploads'
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending ticket:', error);
      alert('Error sending ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="invoice_number" className="block text-gray-400 mb-2 text-sm sm:text-base">
          Invoice Number
        </label>
        <Controller
          name="invoice_number"
          control={control}
          render={({ field }) => (
            <>
              <div className="flex items-center p-2 border border-slate-600 rounded-md bg-[#08090F]">
                <input
                    type="text"
                    id="invoice_number"
                    placeholder="Enter the invoice number"
                    className="bg-[#08090F] ml-2 text-white flex-1 outline-none text-sm sm:text-base"
                    {...field}
                />
              </div>
              {errors.invoice_number && (
                <div className="flex gap-2 items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CD3C16" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                  </svg>
                  <p className="text-red-600 text-sm">{(errors.invoice_number as FieldError)?.message || 'An error occurred'}</p>
                </div>
              )}
            </>
          )}
        />
      </div>
      <button
        type="submit"
        className="mt-5 w-full bg-purple-500 text-white font-bold py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center text-sm sm:text-base"
      >
        Send the ticket
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}
