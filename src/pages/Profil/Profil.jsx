import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getUserAuth} from "../../slices/user";
import {useParams} from "react-router-dom";
import usersService from "../../services/user.service";

import { IconButton, ListItem} from "@mui/material";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {FaBars, FaTrash} from "react-icons/fa";
import Userfields from "../../components/atoms/UserFields/Userfields";
import componentService from "../../services/component.service";
import Avatar from "../../components/atoms/Avatar/Avatar";


const Profil = () => {
    const  [user, setUser] = useState({});
    const [allComponents, setAllComponents] = useState([]);

    const dispatch = useDispatch();
    const userMe = useSelector((state) =>   state.users.me);

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const { id } = useParams();

    const getData = async () => {
        const  response2 = await componentService.getAllComponents();
        setAllComponents(response2.data);
        const response = await usersService.getUsersById(id);
        setUser(response.data);
    }



    useEffect( () => {
        dispatch(getUserAuth());
        getData();


    },[])

    useEffect(() => {
        // tableaux d'object
        let compnent = user?.component != null && user.component.length > 0 ? [ ...user.component] : null;

        let lesComposant = [...allComponents];

        let listComponent = [];
        lesComposant.forEach((x) => {
            x.ordre = 0;
        });
        if (compnent != null && compnent.length > 0) {
            compnent.forEach((x) => {
                let compo = lesComposant.find((y) => y.id === x.components_id);
                if (compo != null) {
                    compo.ordre = x.ordre;
                }

            })
        }
        lesComposant.sort((a, b) => a.ordre - b.ordre);
        lesComposant.forEach((x) => {
            x.component = putTheComponent(x.nom);
        })
       setComponentList(lesComposant);

    }, [user])

    const putTheComponent = (component) => {
        switch (component) {
            case "Avatar":
                return <Avatar user={user}  icon={null} ></Avatar>;
            case "Prénom":
                return <Userfields user={user} field="first_name"  ></Userfields>;
            case "Nom":
                return <Userfields user={user} field="last_name" ></Userfields>;
            case "Email":
                return <Userfields user={user} field="email"  ></Userfields>;
            case "Dernier accès":
                return <Userfields user={user} field="last_access"  ></Userfields>;
            case "Pseudo":
                return <Userfields user={user} field="Pseudo"  ></Userfields>;
        }
    }


    const draggedComponent = useRef();
    const draggedOnComponent = useRef();

    const [componentsList, setComponentList] = useState([])


    const onComponentDragStart =  (e, elt) => {
        draggedComponent.current = elt;
    }

    const putOnVisible = (e,component) => {

        let max = 0;
        componentsList.forEach((x) => {
            if (x.ordre != null && x.ordre !== 0 && x.ordre > max) {
                max = x.ordre;
            }
        });

        let copyList = [...componentsList];
        copyList.find((x) => x.id === component.id).ordre = max +1;
        setComponentList(copyList);
        updateData(copyList);
    }

    const hideComponent = (e, component) => {
        let copyList = [...componentsList];
        copyList.find((x) => x.id === component.id).ordre = 0;
        setComponentList(copyList);
        updateData(copyList);
    }

    const renderComponent = (elts) => {
        elts.sort((a, b) => a.ordre - b.ordre);
        return elts.map((x) => {
            return (
                    <div
                        key={x.id}
                        draggable={true}
                        onDragStart={(e) => onComponentDragStart(e, x)}
                    >
                        <ListItem button onClick={(e) => {  if(x.ordre == 0) { putOnVisible(e, x) } else { hideComponent(e, x) } }}>
                            <ListItemText primary={x.nom} />
                            <ListItemIcon>
                                {x.component}
                            </ListItemIcon>
                        </ListItem>
                    </div>
            )
        })
    }

    const onListDragOn =  (e, elt) => {
        draggedOnComponent.current = elt;
    }

    const hideAllComponents = () => {
        let copyList = [...componentsList];
        copyList.forEach((x) => {
            x.ordre = 0;
        })
        setComponentList(copyList);
        updateData(copyList);
    }


    const executeDraggable = async (e) => {

        const copyList = [...componentsList];
        const index = componentsList.findIndex((x) => {
            return draggedComponent.current.id === x.id
        })
        let max = 0;
        if(draggedOnComponent.current ) {
            componentsList.forEach((x) => {
                if (x.ordre != null && x.ordre != 0   && x.ordre > max) {
                    max = x.ordre;
                }
            });
            copyList[index].ordre = max + 1;

        } else {
            copyList[index].ordre = 0;

        }
        setComponentList( copyList);
        updateData(copyList);

    }
    const updateData = async (copyList) => {
        let copyListSecond = [...copyList];
        let list = [];
        copyListSecond.forEach((x) => {
            let entite = {
                directus_users_id: userMe.id,
                components_id: x.id,
                ordre: x.ordre
            }
            list.push(entite);

        });
        console.log('yo')
        await componentService.updateComponent(userMe.id,list);
    }

    const canModify = () => {
        if(userMe?.id === user?.id) {
            return ( <div style={{marginR:"10vx",display:"flex",justifyContent:"space-between" }}>
                <IconButton  onClick={handleClick}>
                    <FaBars></FaBars>
                </IconButton>
                <IconButton  onClick={hideAllComponents} onDragOver={(e) => onListDragOn(e,false)} onDragEnd={(e) => executeDraggable(e)}>
                    <FaTrash></FaTrash>
                </IconButton>
            </div>);
        }
        return null;
    };

    return (
        <>
            <div>
                { canModify() }

                <Drawer open={open} onClose={handleClick}>
                    <List style={{width:"60vw"}}>
                        <div onDragEnd={(e) => executeDraggable(e)}  onDragLeave={(e) => onListDragOn(e,true)} onDragOver={(e) => onListDragOn(e,false)}>
                            { renderComponent(componentsList.filter((x) => { return x.ordre == 0}))}
                        </div>
                    </List>
                </Drawer>
            </div>
            <div style={{height:"50vh"}}  onDragEnd={(e) => executeDraggable(e)}  onDragOver={(e) => onListDragOn(e,true)}>
                <List>
                    { renderComponent(componentsList.filter((x) => { return x.ordre > 0}))}
                </List>



            </div>

        </>
    );
}

export default Profil;

