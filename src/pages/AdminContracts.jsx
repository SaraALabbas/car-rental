import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

import ContractsTable from "../components/Contracts/ContractsTable";
import ContractsCard from "../components/Contracts/ContractsCard";
import BASE_URL from "../config/api";

// const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function AdminContracts() {
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const loadContracts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/contracts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setContracts(data);
        } else {
          setContracts(data.data || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    loadContracts();
  }, [token]);

  // 🔍 البحث حسب رقم العقد أو اسم المستأجر
  const filteredContracts = contracts.filter((c) => {
    const contractNumber = String(c.contract_number || "");
    const userName = c.booking?.full_name?.toLowerCase() ?? "";
    const searchValue = search.toLowerCase();

    return (
      contractNumber.includes(searchValue) || userName.includes(searchValue)
    );
  });
  const sortedContracts = [...filteredContracts].sort((a, b) => b.id - a.id);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F5F1] p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-[#B67A2E]">إدارة العقود</h1>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="ابحث برقم العقد أو اسم المستأجر..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        w-full
        p-3
        mb-6
        rounded-xl
        border
        border-[#B67A2E]/20
        bg-white
        focus:outline-none
        focus:ring-2
        focus:ring-[#B67A2E]
      "
      />

      {sortedContracts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
          لا يوجد عقود
        </div>
      ) : (
        <>
          <ContractsTable contracts={sortedContracts} navigate={navigate} />

          <ContractsCard contracts={sortedContracts} navigate={navigate} />
        </>
      )}
    </div>
  );
}
