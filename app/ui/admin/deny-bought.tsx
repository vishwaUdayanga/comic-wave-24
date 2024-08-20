'use client'

export default function DenyBought({registrationNumber} : {registrationNumber : string}) {
    const deny = async () => {
        try {
          const response = await fetch('/api/deny-bought', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ registrationNumber }),
          });
    
          const result = await response.json();
    
          if (response.ok) {
            window.location.href = '/admin/bought'
          } else {
            alert('Could not deny');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred');
        }
    }
    return (
        <button onClick={deny} className="pl-4 pr-4 pt-1 pb-1 text-white bg-blue-700 rounded">Deny</button>
    )
}