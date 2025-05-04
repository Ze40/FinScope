import { useEffect } from "react";

import { useNavigate } from "react-router";

interface HandbookRerouteProps {
  className?: string;
}

const HandbookReroute = ({ className }: HandbookRerouteProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/handbook/goverment");
  }, []);
  return <div className={className}></div>;
};

export default HandbookReroute;
