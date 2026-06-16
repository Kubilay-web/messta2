"use client";

import React, { useState, useEffect } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

interface ContactsListProps {
  toggleContactList: () => void;
}

interface Contact {
  id: string;
  name: string;
  [key: string]: any;
}

interface ContactsGrouped {
  [groupName: string]: Contact[];
}

function ContactsList({ toggleContactList }: ContactsListProps) {
  const [contacts, setContacts] = useState<ContactsGrouped>({});
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<ContactsGrouped>({});

  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/contacts`
      );
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data: ContactsGrouped = await response.json();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch contacts on mount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts based on searchTerm

  useEffect(() => {
    if (!searchTerm) {
      setFilteredContacts(contacts);
      return;
    }

    const filteredData: ContactsGrouped = {};
    Object.keys(contacts).forEach((group) => {
      const filteredGroup = contacts[group].filter((contact) =>
        (contact.name || contact.displayName || contact.username || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      if (filteredGroup.length > 0) {
        filteredData[group] = filteredGroup;
      }
    });

    setFilteredContacts(filteredData);
  }, [searchTerm, contacts]);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-black">
          <BiArrowBack
            className="cursor-pointer text-xl text-black"
            onClick={toggleContactList}
          />
          <span>New Chat</span>
        </div>
      </div>

      <div className="bg-white flex-auto overflow-auto">
        {/* Search Bar */}
        <div className="flex py-3 items-center gap-3 h-14 bg-white">
          <div className="bg-gray-600 flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <BiSearchAlt2 className="text-panel-header-icon text-gray-100 cursor-pointer text-lg" />
            <input
              type="text"
              placeholder="Search Contacts"
              className="border-gray-400 text-sm focus:outline-none placeholder:text-black text-black placeholder-gray-600 w-full border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Contacts List Rendering */}
        <div className="px-4 py-2">
          {loading ? (
            <div>Loading contacts...</div>
          ) : Object.keys(filteredContacts).length === 0 ? (
            <div className="text-black text-center mt-4">
              No contacts found
            </div>
          ) : (
            Object.entries(filteredContacts).map(
              ([groupName, groupContacts]) => (
                <div key={groupName} className="mb-6">
                  <div className="text-colors-teal-light pl-10 py-5 text-lg font-semibold">
                    {groupName}
                  </div>
                  {groupContacts.map((contact) => (
                    <ChatLIstItem
                      key={contact.id}
                      data={contact}
                      isContactPage={true}
                      onContactClick={handleContactSelect}
                      toggleContactList={toggleContactList}
                    />
                  ))}
                </div>
              )
            )
          )}
        </div>

        
      </div>
    </div>
  );
}

export default ContactsList;

//8.32.24
