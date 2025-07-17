
import { Inngest } from "inngest";
import User from "../models/User.model.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "book-show" });

const syncUserCreation= inngest.createFunction(
  { id: "user-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    const {id,first_name,last_name,email_addresses,image_url}=event.data;
    const userData={
        _id:id,
        email:email_addresses[0].email_addresses,
        name:first_name+" "+last_name,
        Image:image_url
    }
    await User.create(userData);
   
  },)

const syncUserDeletion= inngest.createFunction(
  { id: "delete-user-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    const {id}=event.data;

    await User.findByIdAndDelete(id);
   
  })

const syncUserUpdation= inngest.createFunction(
  { id: "update-user-clerk" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    const {id,first_name,last_name,email_addresses,image_url}=event.data;
    const userData={
        _id:id,
        email:email_addresses[0].email_addresses,
        name:first_name+" "+last_name,
        Image:image_url
    }
    await User.findByIdAndUpdate(id,userData)
   
  },)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,
    syncUserDeletion,
    syncUserUpdation
];