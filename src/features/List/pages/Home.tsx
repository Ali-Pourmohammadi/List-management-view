import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, List, InfoIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Modern List Management Dashboard
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              List View
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore, filter, and manage List Management with a beautiful,
            responsive interface built for developers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="group bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            onClick={() => navigate("/user")}
          >
            <List className="mr-2 h-5 w-5" />
            View List Management
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { title: "Search & Filter", desc: "Find any user instantly" },
            { title: "Toggle Columns", desc: "Customize your view" },
            { title: "Quick Actions", desc: "Easy Delete or Edit Items" },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-left hover:shadow-xl transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center  mb-4">
                <InfoIcon color="white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {feat.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
