import React from 'react';

export const StateTable = ({ vendors, orders }: { vendors: any[], orders: any[] }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-medium mb-4 text-gray-500 uppercase tracking-wider">Vendor Inventory</h3>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost/Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.map((v) => (
              <tr key={v.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{v.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{v.stock}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">₹{v.cost_per_unit}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{v.lead_time_days} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h3 className="text-sm font-medium mb-4 text-gray-500 uppercase tracking-wider">Current Orders</h3>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-6 py-4 text-sm font-mono text-gray-900">{o.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{o.quantity}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${o.status === 'Shipped' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{o.expected_delivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
