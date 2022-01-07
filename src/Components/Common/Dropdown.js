/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TokenService } from "../../services";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../redux/selector";
import { UserActions } from "../../redux/slice/user.slice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    TokenService.deleteToken();
    history.push("/login");
  };

  const user = useSelector(selector.user);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(UserActions.getProfile());
    }
    if (user.profile_image) {
      setProfileImage(
        process.env.REACT_APP_API_SERVER_URL + user.profile_image
      );
    }
  }, [user]);

  const parseName = (name) => {
    return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
  };

  return (
    <Menu as="div" className="relative inline-block">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="calibre-regular">
              <img
                src={profileImage ? profileImage : "/images/user.png"}
                className="profile-image mr-2 w-10 h-10 inline-block border rounded-full"
                alt=""
                title=""
              />
              <span className="font-18 xl:inline-block lg:inline-block md:inline-block sm:hidden hidden">
                {!!user.first_name && parseName(user.first_name)}{" "}
                {!!user.last_name && parseName(user.last_name)}
              </span>
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 w-24 rounded-md shadow-lg bg-white"
            >
              <div className="">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/home/profile"
                      className={classNames(
                        active
                          ? "bg-gray-100 text-gray-900 calibre-regular"
                          : "text-gray-700 calibre-regular",
                        "block px-4 py-2 text-sm font-16"
                      )}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900 calibre-regular"
                            : "text-gray-700 calibre-regular",
                          "block w-full text-left px-4 py-2 font-16"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
