
import React from 'react';

const FareRulesContent: React.FC = () => {
  return (
    <div className="p-5">
      <div className="text-sm text-gray-600 space-y-4">
        <p className="pb-2 border-b border-gray-100">
          <strong className="text-chamDarkBlue">Penalties (Per leg):</strong> Modification before 24 hours: USD 75 + Any fare difference. Refund before departure: USD 170. After departure Non Refundable No Show: USD 210.
        </p>
        <p className="pb-2 border-b border-gray-100">
          <strong className="text-chamDarkBlue">Changes:</strong> Changes or refund within 24H not permitted and will consider as No Show.
        </p>
        <p className="pb-2 border-b border-gray-100">
          <strong className="text-chamDarkBlue">Infant Policy:</strong> INF fare Non Refundable
        </p>
        <p className="pb-2 border-b border-gray-100">
          <strong className="text-chamDarkBlue">Stop over:</strong> Not permitted. Void not permitted on B2B TKT.
        </p>
        <p className="pb-2 border-b border-gray-100">
          <strong className="text-chamDarkBlue">Baggage:</strong> Baggage allowance 30 kg // Baggage Allowance for INF 10 kgs on 6Q sector
        </p>
        <p>
          <strong className="text-chamDarkBlue">Connection Requirements:</strong> Connecting airline ticket is required to reconfirm with Cham Wings office for a confirmed segment status. Passengers are required to carry connecting airline confirmed ticket.
        </p>
      </div>
    </div>
  );
};

export default FareRulesContent;
