import React, { useState, useEffect, useCallback } from "react";
import { FiCalendar, FiMapPin, FiClock, FiUsers } from "react-icons/fi";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { getMyEvents, cancelRSVP } from "../services/eventService";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import EventCalendar from "../pages/Calendar";

const MyEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookedEvents, setBookedEvents] = useState([]);
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const fetchMyEvents = useCallback(async () => {
    const events = await getMyEvents(user.id);
    setBookedEvents(events);
  }, [user.id]);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  const cancelBooking = async (eventId) => {
    const loadingToast = toast.loading("Cancelling your RSVP...");
    try {
      await cancelRSVP(eventId);
      toast.dismiss(loadingToast);
      toast.success("RSVP cancelled successfully!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to cancel RSVP.");
    }
    fetchMyEvents();
  };

  const categories = [
    ...new Set(bookedEvents.map((event) => event?.category || "Uncategorized")),
  ].filter(Boolean);

  const filteredEvents = bookedEvents.filter((event) => {
    const matchesSearch = searchQuery
      ? event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesDate = selectedDate
      ? new Date(event.startDateTime).toDateString() ===
        selectedDate.toDateString()
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <>
      <div className="flex justify-center w-full h-24 max-md:h-[85px] bg-transparent backdrop-blur-md z-50 fixed">
        <Navbar hideMyEvents={true} />
      </div>
      <div className="min-h-screen pt-8 relative top-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h1 className="text-2xl font-bold text-gray-100">
                {selectedDate
                  ? `My Events on ${selectedDate.toLocaleDateString()}`
                  : "My Events"}
              </h1>
              <SearchBar
                placeholder="Search my events"
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full md:w-64"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div>
                <motion.div
                  className="lg:w-[350px] w-full bg-zinc-600 rounded-xl p-4 shadow-lg"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <EventCalendar
                    events={bookedEvents}
                    onDateSelect={setSelectedDate}
                    onPreferencesChange={setSelectedPreferences}
                    preferences={categories}
                  />
                </motion.div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 w-full h-full">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-8">
                    {/* <div className="flex rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`px-4 py-2 rounded-md outline-none border-none text-sm font-medium transition-colors ${
                      activeTab === "upcoming"
                        ? "bg-blue-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Upcoming
                  </button>
                </div> */}
                  </div>

                  {(selectedDate ||
                    selectedPreferences.length > 0 ||
                    searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedDate(null);
                        setSelectedPreferences([]);
                        setSearchQuery("");
                      }}
                      className="text-sm text-primary hover:text-primary/90 mt-2 mb-6"
                    >
                      Clear filters
                    </button>
                  )}

                  {filteredEvents.length === 0 ? (
                    <div className="text-center py-16 rounded-xl shadow-sm">
                      <div className="max-w-md mx-auto">
                        <FiCalendar className="mx-auto h-12 w-12 text-gray-100" />
                        <h3 className="mt-4 text-lg font-medium text-gray-200">
                          No upcoming events
                        </h3>
                        <p className="mt-2 text-gray-300">
                          You haven't booked any upcoming events yet.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {filteredEvents.map((event) => (
                        <div
                          id={event._id}
                          key={event._id}
                          className="bg-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                        >
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                  <h2 className="text-xl font-semibold text-gray-100">
                                    {event.name}
                                  </h2>
                                  <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                                    {event.category}
                                  </span>
                                </div>
                                <p className="mt-2 text-gray-300 text-sm">
                                  {event.description}
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="flex flex-col justify-center items-center text-center text-gray-400">
                                <FiCalendar className="mr-2 text-gray-300" />
                                <span className="text-sm">
                                  {new Date(
                                    event.startDateTime
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }) +
                                    " - " +
                                    new Date(
                                      event.endDateTime
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FiClock className="mr-2 text-gray-300" />
                                <span className="text-sm">
                                  {new Date(
                                    event.startDateTime
                                  ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }) +
                                    " - " +
                                    new Date(
                                      event.endDateTime
                                    ).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                </span>
                              </div>
                              <div className="flex flex-col justify-center items-center text-center text-gray-400">
                                <FiMapPin className="mr-2 text-gray-300" />
                                <span className="text-sm">
                                  {event.location}
                                </span>
                              </div>
                              <div className="flex flex-col justify-center items-center text-center text-gray-400">
                                <FiUsers className="mr-2 text-gray-300" />
                                <span className="text-sm">
                                  {event.attendees?.length || 0} attendees
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => cancelBooking(event._id)}
                              className="px-4 py-2 text-sm text-red-600 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors mt-4"
                            >
                              Cancel Booking
                            </button>
                          </div>

                          <div className="px-6 py-4 bg-zinc-600 border-t border-zinc-600 flex justify-between items-center">
                            <span className="text-sm text-gray-300">
                              Booked on{" "}
                              {new Date(
                                event.attendees.find(
                                  (attendee) => attendee.user._id === user.id
                                ).registrationDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEvents;
