interface StatCardProps {
  number: string;
  label: string;
}

export default function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-green-600">
        {number}
      </h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}
