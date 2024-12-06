import Image from 'next/image';

export default function Partners() {
  const partners = [
    { id: 1, name: "Sponsor 1", logo: "https://plchldr.co/i/500x250?bg=111111" },
    { id: 2, name: "Sponsor 2", logo: "https://plchldr.co/i/500x250?bg=111111" },
    { id: 3, name: "Sponsor 3", logo: "https://plchldr.co/i/500x250?bg=111111" },
    { id: 4, name: "Sponsor 4", logo: "https://plchldr.co/i/500x250?bg=111111" },
    { id: 5, name: "Sponsor 5", logo: "https://plchldr.co/i/500x250?bg=111111" },
    { id: 6, name: "Sponsor 6", logo: "https://plchldr.co/i/500x250?bg=111111" },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Our Trusted Partners</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="flex justify-center">
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="object-contain"
              width={100}  
              height={100} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}