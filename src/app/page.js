import HeroBanner from "@/components/Bannar";
import { getAdvertisedTickets, getLatestTickets } from '@/lib/actions/tickets';
import TicketsCard from '@/components/Tickets/TicketsCard';
import PopularRoutes from "@/components/Home/PopularRoutes";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export default async function Home() {
  let advertisedTickets = [];
  try {
    advertisedTickets = await getAdvertisedTickets();
  } catch (error) {
    console.error('Error fetching advertised tickets:', error);
  }

  // latest ticket
  let latestTickets = [];
  try {
    latestTickets = await getLatestTickets(8);
  } catch (error) {
    console.error('Error fetching latest tickets:', error);
  }
  return (
    <div>
      <main>
        <HeroBanner></HeroBanner>

        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-400 mb-6">Featured Tickets</h2>
          {advertisedTickets.length === 0 ? (
            <p className="text-gray-400">No advertised tickets yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advertisedTickets.map((ticket) => (
                <TicketsCard key={ticket._id} ticket={ticket} />
              ))}
            </div>
          )}
        </section>

        {/* latest ticket */}
        <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Tickets</h2>
          {latestTickets.length === 0 ? (
            <p className="text-gray-500">No tickets available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestTickets.map((ticket) => (
                <TicketsCard key={ticket._id} ticket={ticket} />
              ))}
            </div>
          )}
        </section>

        <PopularRoutes></PopularRoutes>

        <WhyChooseUs></WhyChooseUs>
      </main>

    </div>
  )
}
