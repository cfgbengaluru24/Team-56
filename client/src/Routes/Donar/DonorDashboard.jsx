import React, { useState } from "react";
import SlideBtn from "./SlideBtn";
import Panel from "./Panel";
import DoubleAreaChart from "../../components/Charts/DoubleAreaChart";
import DataTable from "../../components/Tables/DataTable";
import { BsEmojiSmile } from "react-icons/bs";
import Reports from "../Reports/Reports";
// import Profile from './Profile';
const DonorDashboard = () => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const openPanel = () => setPanelOpen(true);
  const closePanel = () => setPanelOpen(false);
  const { smileCounter, latestSmile } = {
    smileCounter: 100,
    latestSmile: "7h ago",
  };
  const transaction = {
    headers: ["Date", "Transaction ID", "Program", "Amount", "Invoice"],
    headerKeys: {
      Date: "date",
      "Transaction ID": "transactionId",
      Program: "program",
      Amount: "amount",
      Invoice: "invoice",
    },
    data: [
      {
        date: "2021-10-01",
        transactionId: "123456",
        program: "Free Clothes",
        amount: 1000,
        invoice: "INV-123456",
      },
      {
        date: "2021-10-02",
        transactionId: "123457",
        program: "Free Clothes",
        amount: 2000,
        invoice: "INV-123457",
      },
      {
        date: "2021-10-03",
        transactionId: "123458",
        program: "Free Clothes",
        amount: 3000,
        invoice: "INV-123458",
      },
      {
        date: "2021-10-04",
        transactionId: "123459",
        program: "Free Clothes",
        amount: 4000,
        invoice: "INV-123459",
      },
      {
        date: "2021-10-05",
        transactionId: "123460",
        program: "Free Clothes",
        amount: 5000,
        invoice: "INV-123460",
      },
      {
        date: "2021-10-06",
        transactionId: "123461",
        program: "Free Clothes",
        amount: 6000,
        invoice: "INV-123461",
      },
      {
        date: "2021-10-07",
        transactionId: "123462",
        program: "Free Clothes",
        amount: 7000,
        invoice: "INV-123462",
      },
      {
        date: "2021-10-08",
        transactionId: "123463",
        program: "Free Clothes",
        amount: 8000,
        invoice: "INV-123463",
      },
      {
        date: "2021-10-09",
        transactionId: "123464",
        program: "Free Clothes",
        amount: 9000,
        invoice: "INV-123464",
      },
      {
        date: "2021-10-10",
        transactionId: "123465",
        program: "Free Clothes",
        amount: 10000,
        invoice: "INV-123465",
      },
    ],
  };
  const leaderboard = {
    headers: ["Rank", "Donor Id", "Amount Donated (weekly)"],
    headerKeys: {
      Rank: "rank",
      "Donor Id": "donorId",
      "Amount Donated (weekly)": "amountDonated",
    },
    data: [
      { rank: "🥇", donorId: "123", amountDonated: "17 Lakhs" },
      { rank: "🥈", donorId: "124", amountDonated: "16.5 Lakhs" },
      { rank: "🥉", donorId: "125", amountDonated: "14 Lakhs" },
      { rank: 4, donorId: "126", amountDonated: "12 Lakhs" },
      { rank: 5, donorId: "127", amountDonated: "11.5 Lakhs" },
      { rank: 6, donorId: "128", amountDonated: "9 Lakhs" },
      { rank: 7, donorId: "129", amountDonated: "8.7 Lakhs" },
      { rank: 8, donorId: "130", amountDonated: "8.5 Lakhs" },
      { rank: 9, donorId: "131", amountDonated: "8 Lakhs" },
      { rank: 10, donorId: "132", amountDonated: "7.8 Lakhs" },
    ],
  };
  return (
    <div className="">
      <SlideBtn onClick={openPanel} />
      <Panel isOpen={isPanelOpen} onClose={closePanel} />
      <div className="min-h-screen p-10 flex flex-col items-center gap-4">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl">Donor Dashboard</h1>
          <div className="flex  items-center gap-4">
            <div className="flex gap-2">
              <div>Latest Smile:</div>
              <span className="underline decoration-amber-500 decoration-2">
                {latestSmile}
              </span>
            </div>
            <div className="flex gap-2 bg-amber-400 rounded-full px-3 py-1.5">
              <BsEmojiSmile className="w-6 h-6" /> Counter:
              {smileCounter}
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 h-fit gap-8">
          <div className="grid gap-4 shadow-md p-4 rounded-xl bg-white">
            <h2 className="text-2xl">Donation Overview (Jan-Jun)</h2>
            <DoubleAreaChart />
          </div>
          <div className="grid gap-4 shadow-md p-4 rounded-xl bg-white ">
            <h2 className="text-2xl">Donor Leaderboard 🚀</h2>
            <DataTable {...leaderboard} />
          </div>
        </div>
        <div className="h-1 w-full bg-g"></div>
        <DataTable {...transaction} />
      </div>
      <div class="flex justify-center items-center min-h-screen">
        <Reports/>
      </div>
    </div>
    
  );
};

export default DonorDashboard;
