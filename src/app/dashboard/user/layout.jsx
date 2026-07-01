import { requireRole } from "@/lib/core/sesson";


const UserLayout = async({ children }) => {
    await requireRole('user')
    return children
};

export default UserLayout