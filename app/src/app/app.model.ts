export interface Project {
  id: String;
  title: String;
  caption: String;
  description: String;
  people: Array<string>;
  features: {
    tasks: Boolean;
    messaging: Boolean;
    files: Boolean;
    comments: Boolean;
    reports: Boolean;
  };
  tags: Array<string>;
  status: 'active' | 'archived';
  startDate: any;
  endDate: any;
  createdAt: any;
  lastUpdated: any;
}

export interface User {
  firstName: string;
  surName: string;
  designation?: string;
  role: 'Administrator' | 'Manager' | 'Associate';
  email: string;
  password: string;
  phone?: number;
  updatedAt: any;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}

export interface TaskList {
  id: string;
  userId: String;
  title: string;
  projectId: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  isCompleted: Boolean;
}

export interface Task {
  id: string;
  userId: String;
  projectId: string;
  taskListId: string;
  parentTaskId: string;
  title: string;
  description?: string;
  people: Array<string>;
  deadline?: Date;
  status: 'todo' | 'doing' | 'completed';
  createdAt: Date;
  lastUpdatedAt: Date;
}

export interface Time {
  id: String;
  taskId: string;
  projectId: String;
  taskListId: string;
  userId: string;
  invoiceId: string | null;
  from: String;
  to: String;
  date: Date;
  description: string;
  isBillable: Boolean;
  isAlreadyBilled: Boolean;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export interface Comment {
  id: String;
  userId: String;
  description: String;
  createdAt: Date;
  projectId: String;
  taskId: String;
  lastUpdatedAt: Date;
}

export interface Notebook {
  id: String;
  userId: String;
  projectId: String;
  title: String;
  description: String;
  people?: Array<string>;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export interface ProjectChat {
  id: String;
  userId: String;
  projectId: String;
  message: String;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export interface Activity {
  action: 'added' | 'edited' | 'deleted';
  model: 'Task' | 'File' | 'Comment' | 'Notebook';
  modelId: string;
  userId: string;
  createdAt: any;
}

export interface Invoice {
  invoiceId: string;
  projectId: string;
  date: Date;
  currency: string;
  Pricing: string;
  finalPrice?: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export interface Expense {
  expense: string;
  userId: String;
  expenseId: string;
  projectId: string;
  cost: string;
  date: Date;
  description?: String;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export const logoData = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWMAAACxCAYAAAARQ9xxAAAACXBIWX
MAAAsTAAALEwEAmpwYAAAgAElEQVR42u19CVwUR9p+eyuKKIq3EMQDDwxRwSMaVkWNGzWJVzwSl9
W/q5uNR7JRYz6zyZe4SdT97Xrs5xGzamI81uARj3iA94U3niCnHKKADALxAtF/Pc0UlmX3MAPdzQ
zU8/uNM4MzPd1VXU8971tvvW+Fp0+fSgICAgICpYuKogkEBAQEBBkLCAgICAgyFhAQEBBkLCAgIC
AgyFhAQEBAkLGAgICAAIPKogkEBAQELOPUqVPuCAOuWLHiE/JcsWvXromCjAUEBAR0xunTp5sFBw
e/HxISMjI7O7suIeBKhIhdzPsyTPinWbNmsf369ds0Z86cf2jxmxXEpg8BAQGBZwp40aJFC8hzIH
nrWqFCBenJkydQxPIz3uMB3jQrZROehw0btmL+/PmfCjIWEBAQKCHmzp378erVq2eDhIvxdVPt2r
Uz/+d//udPw4cPPyDIWEBAQKAYmDVr1tfBwcGTQMTgRKp+8WwLyHeyFixYMJQoZZsJWURTCAgIlG
vMnDnzOSKGS0Imx4q20yP8yjNmzNhCjtdHKGMBAQEBK7F48eLx8BFLnGuCkrKt/Ai/cqVKlfA904
YNG1729/dPFmQsICAgUAS8vLwyKlSo4Ep5kFXG+fn5Nqtj6tYAKTdv3vzM4cOH/a1W1aI7BAQEyi
PGjBnzX4SssYKUi5SQWP+xLeoY30lOTvbasmVLgFDGAgICAkWoYqmIyAk2tM1WrsR3mzRpcv7IkS
OdhTIWEBAQUADC2KCKi4qWsIWI2QgMqq5v3rz5krXnJMhYQECg3AGbOpgddUUSrDVg/c70u4C1kR
WCjAUEBModrl275kfVq1Zg45KpmiYP11u3blmljgUZCwgIlFvYuqnD1mOBlE+ePDlAkLGAgIAAh7
CwMHeWQOEX1koZ88e0RXkLMhYQEChXQBpMybzbDg9s0tBSGbOxyua/W8X2IoWmgKH47rvvRv3www
+zHjx44Ex9bERFVKQ3bJ06ddJbtGgR2a5duzM+Pj4n+vfvHy5aTUBLmO83m5Wrjb/BkrNVoleQsY
ChyMnJcU1NTfVVGwTZ2dlemZmZ3dLS0oLS09PnPnz40GnIkCEnRMsJaIWSxA4XdVx6PGYBz+rvCz
IWMBRdunQ50KNHj3WnT58em5eX90LoEN4TQsZqtxQbGzvn4sWLPc6ePXvQz8/vwODBgwUpC+hCyM
XJ0MaDPQ6/i0+QsYDdISAgIPLx48fzKlWq9OTEiRPvkdcvKAs6KB49eiRFR0f3SUpK6oO40KioqE
0DBw5c265duxzRkgJaKlmtoirY49iahlOQsYDh6Nu372UnJ6fPa9WqdXf//v1THj58+NyNS1ei6d
/w/zExMQHp6ekB169f9x01atSiPn36XBUtKVCWIMhYoFTQvXv3+Jo1a35RvXr1+3v37p3122+/Kf
ryWBMvKytLOnTo0MT79+8737t3b4lwWwgIMhYQ0AAdO3Y0TZ48+TOEGm3fvn02fMg8AfOmHtIaho
WFjcrMzKwfHx+/YerUqatESwoIMhYQKCG8vLzyxo0bNw8VePfv3z8Zylgptyz7Hp+JiIgIvH37tj
tC5GbNmrVItKSAo0Ns+hAodbRv3z4LfmBfX9+tLBnzkRaUiPGM/7t7927r4ODgyQsXLpwoWlFAKG
MBAQ2AKIuUlJSV6enpjRMTE7spqWElgs7MzPT++eef369Ro8b9SZMmrRMtKSCUsYBACTF69Ojd/f
v3/7lWrVrPqWHWZ8w/4/9u377t+9NPP330/fffjxStKCDIWEBAAwwZMuQ/Xbt2XVmtWjWJVcf8az
6QnqjqTmvXrv14/fr1A0UrCggyFhAoIeA/fv3119c1btxYJlzqI7YGycnJfhs3bpy2c+fObqIlBR
wNwmcsYHcgqviRs7Ozzfv74bqIiIgY8N///vdORkZG4+bNm0eR42TVrVs3tWXLlnmiZQUEGQsIWM
D169edkpKSvBISEtqiom5cXFzb1NRUxXhjS6DEHR4ePpYcZ2zt2rVB7FK9evWWe3h4RHp5eV11d3
eP6tq1a6JodQFBxjrj1KlT7tnZ2a5EIXVSGKwoQJiP102bNr3RrFmzmFq1amXBNBa3grEghFmfkH
Dn6Ohon1u3bnnevn37/ZSUFHmXHXJS8GBTEhaFe/fuSffv32eJfHKNGjVQqVdyc3PbuGHDhhRCyt
Gk308TxXwZsc6iR0oXp0+fboZUkyiHlJOT40LHK0Fefn5+FWIl5ZN7QB6/ZDINxaTbrVu3MjWpOi
wZX7161eXMmTN90HkgXvLwY3IbuPLZkthsSuwKPXk24dnb2/s8Ieh4MkDDSCfv8/f3TxZDRFtcun
TJNTY21gd9Rki4I3n9XkZGhoRkQZbii+nfioLSJhF6LJBzTEwMMsGNwt8oObdq1WoJ+r5NmzbnPD
09IwUx64+QkBBfjNmwsLAB5LkzId+6tF6cpX5G32IHprlPsyhRk/G6F/mv27Zte37YsGEHHLVdKu
iVXFkPbN68uQ/pwP6hoaHDzR3oyg9cNi6VJWQ2rR2fWYlXXehozMSBgYGb+vXr97Mjd7C9WCuoA4
bJMyEhYdTdu3dl9YuBpZRikCVRWzJfsX3Jl9NhQ+HY15UrV5acnJyk+vXrS4SQl/bs2XOnn59fqP
Axa4tVq1YN27p160Qqmghci+pD/m9WTMqysCKiKpaM201Q0OQ5XOl+HDNmTIJR107OY9P69evfcX
gyRsMREp4cHBz8vtnF4Gqp4/gBp6Sy+AHJETF/PLmD+/btu7l///4bBTFbD0K+zfbv3z/s7NmzfY
giHYI8xaWiOFSUNhsmh/cov+Pm5iZ16NBhJUiZPHYRtZwverJ4WL169bAtW7ZMhCVk/pNrUX1ka1
5hNTFm/pupdu3amSDmoKCgb2jqVUHGxVDBixYtWnDz5s2XLHWiwTBhdX78+PFzRYIayy4kYoqOhB
KOiopCUh/JkSwwDGairiQyeJf+7ne/2zpy5MhQ0avWY+bMmV8TEp5EFbAWidu1GLtQykRMrcBa0e
jRoxOMOieHJWNCwBNRI42YsvVJY7nYSUfys7EJ54WOnT9//qdi+D3Dtm3beu3bt2/UuXPn3gcJwx
XhaKD3G5Syh4fHUVhF5LGpS5cut0QPWyZhIqImURVsTQRMaQBRNjk5ORbXKMo1GUMJz5079zv4gr
EAZ2uW/FIyeU34Z/r06TOmTJlSrpUyTL/9+/cPP3jw4Fs3btzoRU1O1odvb31pTV/jvOvUqSP5+P
ishbn77rvv7hS0+zxmzZr1dXBw8CTz2HjOitW6koYW4O9JvXnGYcgYgxgkbHbsu7INxi/E2FOH8q
QM39ScOXP+VB59yuvWrRu0ffv2INKHw2hImVGqQw/yZTeb0EFr9idf7tGjx68jRoxYKmKVJWnx4s
Xj16xZ8ylvxaqt5dhTH1taUyqXZPzVV1/NWr169Wx0pBoJG9lots6uChOEyd/fP3TDhg3vlIfBiM
0amzZtmrJ79+6xt2/f9jFSbejVp0rnzr6vWrWq9PLLL29+++23V77zzjt7y6sVNHPmzOCkpKTWdO
yy7UajZPi2sydVzJb40vt+tZaMK5dWZ86YMWMrFudoZ9LGoAOaj4iwl5lWST0xpOx65syZQF9f37
jp06f/NSgoaGtZHZCIlEDqyn379s2G/42/odnB6EhuCaXJn73vcnNzce3DTCZTg99++81lwoQJm8
oTERMr9mMIKMnsE+bFCbUi2LazJyHFRm3ggXNVC7E0GoaTMUybhQsX/pNcvAvfSLQzeRKmg7u0G4
slYjaelQajm+FKyMn1yy+/XE0mnf7Lli37c1kbkIcPH/Ym6n9aWFjYZJaIlSwHR3NV8HmT+XhX9D
MGcGxsbK+1a9dWv3PnTuORI0f+uzyEwA0ePHgPdScqkSxLdHyb2puVRPmEVcalfk5G/tikSZO+Q7
ga9S8VpU7YTrSHxuJNHAq6K4i74Vz27t07GjcwQr3KyoD85Zdfeq1YseJ/jx07JhOxNX3jKETMus
j4WHSl/idmut+mTZsWkvb44tq1a85llYSxY+6VV16JYYmYbRe1mH1+PNuTBcRPInYxQRg5q4aGhg
6TrIgZtscVWEvEonSeZsXsQgbpgHffffdcWRisK1euHEWU/lfETB/54MEDhyTcogZpUX/n8yljN+
H27dvnLF269O9w3ZQ1Il6zZs3bkydP3p+dne3FR0pY0/f2eF9YsuLKNBmDhDCrmnfhuErlCNRkIw
rSi0xGNxC+56jXgioaiP+Ojo4OYE07Vk2WByjlVsbWbqIep5A2+tu5c+cal5VrRcjaV1999X15G7
elBV19xiDisWPHXsCsWh4ak11JZpPW0J1IM2fO/Jl8ZijBYUe6ro0bNw5A0naUN2JNdVvzDZcFsB
MRu46BZEeHDh2a6OzsbKpZs+aX3t7e9x35OrGBAykIyEsXR40Td7iJXhCxtkoYizuUmNlENea/uc
6YMWMLuckdRiHv2bOnExK8JCYm9uCjSOzR72bEhMuGwLEwE/KsH3/8cRbC/hz1Gsk9+i22M8PN5q
hhioKMVYi4vCknJZ83Q16un3zyyc9YFLH3a0HUBIjl8uXLw0A0LBHzhUH5iaesT7pqkQMmk0nau3
fv31CPz1EVMSZf+IfL07gts2Q8ZsyYi/CT8qvT5UU5WcoiZ34Pl0WwPS/qXbhwoSF8xOfOnRv58O
FDRSLmr7u8ANYPG3LJ9jPemxf1JvzrX/+a7IhEjHQE5bFfyxwZI2oCwfDsDhc+6Xd5M2GVrj0rK8
vr3XffvWCv1wJ/4bFjx4JYRUyvRSl8qTypYno/85uRqG8VIGPAfdu2beM3bdoU6AjXhcVlJPkh51
+fFVDlbU2gzJAxZlZETbAhMPSmLQ8dyi9usX9XIm5CyHUHDRoUYm/XQRTx23v27BlFiYU9f9YNg9
eIJMCutPIyYHGdWKTFJMXmruAtIBqHvGPHjqDz5883tOdrMm9v/llioiaUXFECDkLGSCRtTp+nmL
WpPCkna68bkxbKz2CLqb2c/5EjR1oj6Q8xtVvzyX54FwyIGPXm8GB3JDqyZVMUQMRIhvTo0QPyOo
+0S775e8oWA4qjEkIeb8/XPWnSpENYXBZ0WAbIGDvMkHlNEvGIVpu5zOB3XbNmzWx7WdDbuXNnEO
nPIfw58y4YEHGVKlUkd3d3ORE7yBhEZctkZK8Tqdr/5eXlyf5iFxcXqWrV6vL1PqvJlv9CxQkAm2
OwExNixR6veezYsRvgVixPC7Blmow/+eST/woitl598RmtsGCCBb3SPjfssDt8+PAQkI7SVmCqfM
nglc30nj17Sh999JE0atQoqXHjxjLxwGVRlsxaei24XkxAXl5e0siRo6SBA9+Q6tRxlXJy7j2XOE
rJtE9NTfXZtWvXuKNHj7a2p2tDXTrUlCyqEKiAg5AxKnMQJdVNdKbt6pgtnJqdnV0XPvfSOicyKN
337Nkz+s6dO+3xnnc7QBHiNcgWpNu6dWtp3LhxhJhGQl1J/v7+8ndgwrMpFMsCGeN6QMSoKI3r/O
Mf/yhNmDCBvO5GrINq8uQElwWbrYy3KmBtEEJ+z56u7d///vc8IaLKEBkvXrz4WwSHCzPHdnXMZY
xyRQTD6dOnSyW/wa+//jouMjJyCJuJjlXDeA8iRiklqODhw4dLPXr0kKpXry67KkBSDRs2lImLKm
tHn6BZVYyHh4eH1LZtW6lRo0ZSq9beUr/+ryO3MWmXx9LDh7mqYX/oZ7QdsTretJcNP6NHj/4vks
KL0VhGyBj+JnIDVuLNMgHLA1xt4kI2O3MuAEMBf/WpU6cCof5otATvngAZQQGaK2VLb7zxhlSrVq
3Ca/L29pY8PT1ldYjjlJWQKEwuIFL4x2ENNG/eXMrOyZEQe92xY0ep/4CB8t9gLeBvdAcm6+KhYy
MtLc1n//79I0o7vhz9jbzbbGJ4MX4dmIwRDgN/k6V0mAKWXRVKCdjh8tmyZUuAkedy4MCBYTdu3A
hQ833ib4iYANn4+vpKb775pvTSSy89t/uufv36UsuWLSUnJyeZvPhcBo6WZJ4CKh+EjEU7Dw9Pyd
W1vtwOSB+Ka4VFAAsBFUDgosGkxSfYZ3Hp0qXJ4eHhPUvz+rDYrlarTsABydi84CQc/8UkYb5gJ6
uOkXzfqPPZtWtXt9OnT/ehJMImz6fEBDIC+aCq7oABA6QuXbo8pwDxeVdXV1k51q1b94VKLY5qOb
ETE66raZPmkrOzM2mPp/KEgzZr1qyZ1K1bN/kZFgEetD/ZmGzaBkQdS6S9A6Ojo6uXxjVhjSc5Od
lLELH9oVhZ27Bbh3ao3h2pVI+MJwveBdC9e3fZtwfyoM9Adna2FBERIT8TUxGLVorHNvKalDbEoB
wV2tiI4qZnz57tTfqyB9+GLBFlZWXJr9GWAQEBsgrmAZJq1aqVTMpxcXGFFTEccbJk2wHKuHLlyp
KbW0OpfgM3qWKlKtLjRwULdnl5T6WaNWtI7dr7SC/7dpESEpJkVw4W+ggVk2NUfCHcDY/z589/RB
TyLtJehhevxRZ3PkG8lhOl0iTM3k/s39n3GKNdu3aVH+3atZPvJzxTYLxCEGDMYgwTy1wex0rjVu
maHCHZUbHIeMmSJd8iSJwv6qelmaiWYJ79PfZ1v379JEJecmeiY9UaH5/j/GfyIzg4+IVK1KVYe8
8VC6Pkevz1/JHQ0FCfc+fOBUDhqbUxnkEwNWvWlM3xNm3aKN7gGAxYyMPj4sWLsnKE6e6oVgtVti
Bj+MbhF8ZEw27xR7vh/7Ggifvu7JlTZCKKMRM4BIPyPXj79m1sBulpdCVxxDpj1ydbcohGgGixS5
bPRcNuoVeqlgJgzPbv318KDLS8a5wSM9qZHbsYt/v37y+ysKgjWGY2uykQApWUlORlaRbSiojVzC
j297Cqf+jQIWn58uVyh1IVbK2/EuQ8f/58DA5p2rRpsm+QjwMuje3cqLyrt+/4ypUr3YiKHaC0WY
G2H/yjIFYsziGumFXFfCwyTHn4jaFqsKDFxlQ7kluCVbEY5LinWrRoIdWpU4e8f/zcIid86dWqVZ
F96YisQHQJ2ozuyFMaG7AaiNLrTO5b79JQxWpqUov2o5OY0v3Bjm+Q8JEjR+SxhwVh9nNq58S/x9
hdsWKFPP7hPlMTb46SAtTmkcLGJloytUsyu6rV0uI74uDBg3JnQrWodb7arMh/BgNu6tSpCD+Sbw
4+TaJRncmQoYu5Cq8uwIo+appR0uTbig4sEAtUsY+Pj+wTVptAAZAVIgwaNGhQGFHB+03tXRmzfU
3jpRs1aiJ5kUkGLglMTOx1QwXj0bRpY6kjIWOE99GoFLVxgb+TSXAIsUoMC3OD2ysxMbG1Ug1Hrc
AXE1Yaa+3bt5d27NghzZs3T965yfOI0rMloQbAX7906VJp/fr18mslInaEe9BmMj558mR/3gzRqn
OpkuDDv9jGhOoCAUMJg4SLqklnqfCpGiljtv3uu+9k89ToqtTsuSPpkl5hUNevX+8UHx8/sShyAv
m4ubnJgwhmuqU2hW8VfmWoSLp9mCV2R1LHeAapVqtWTfJ46SWpSZMmct9gcuKT7NOt4did17SZ+3
PqUKl/8X/wf6J/jSpWS8z5SXQ/gBJBaTV+lXI907aC5bl9+3bZ5cD/flEK3ZIoon+HCwPHh7Wsl+
VuN2S8ePHi8fRG04OkFPI2PNeYmPUw+w0dOlTxcyoK02ryYzsQLo8NGzbI5GJkZ3LX7YqKC3q5KG
7dumVR5UAZ4hk+URq2VhTwWZjsIG74mu25uKyl9sczQtVwHZiI6tWr98J6An2NCQtthc0guEdB4G
zeCt6CpM8JCQlBsbGx7Y24LkRwsOdjRFFONvRxwYIFsuWpNvbU1DB7/xRVMBafhZsRqvtvf/vbc+
seZY6Myez6F/icFHaP6UZI9Lcwm7KzKk+iRbk1rDlPftCAiNetW/fcqq5Rbgo62YWEhIzU+jeQOJ
4oY1+QjSW3Do2IAMFgYY4uyFkiVlguWOiDWwMuEKqOHS3OGOeOa2/VprXc/9j2XOALfvGewzViMQ
9EAAWNZ7xXirVm2wG7GUk/dNb7epCDQslC0WOC5PsZbbFz507ZR1zUeFSzcm35LEVQUJA8AbBjqc
yQMcxlhFzx6RT18j2xJh3cESBFdGxR6tYaBWylz7bQbQE1DpIpDSCEMCIiQtMfJ4qsNVHFo9gJT+
nmxzNUHhQfFKK1Exr8xn369JEX9EBg7EYIR1DFmIRAxlD5iKmG2wX3IY06UXLT4f+rV3eS/eXsfV
r4mQov3ofmUMtO4eHhum5LRvUOiVvn0YuM+fvn22+/VRQztkQ8FPVZNbLGBDBnzhyHKW5h9RmGho
aOkAzKVUwbDg2OG3vZsmWFURJG+mxZtQdCVnOf6KmQ0ebmPNGaISkpqRVcCOyExys+6lsEGWNhDr
GzSi4hpXsAxI2NELAsaLYze9hya83v05A1XH/btu2lTr6d5QXM3NyHL/ghcZ9Sy62gGG0FqQ65X5
2dXRBL8fy6x1Nl0UH6Iig1NdVdz+uGb1qpv/RwM7Jt/Nlnn8lha3qrUktkjaROIGU1V4U9pXy1mo
zDwsIGGHliVHnAz1QabgK+c3AOuLnYhQQ9fFFKhIe8EVodHzu/sKpOyZi/mfkKJTDV2XhhpaB+Jf
8jrJlOnToVJhjSS4lp2e5shjYs3iJ6BG4HnD9cETwZK2Xfw0IeFjLznz5RdZ+x7YV+SEtL0y05FK
IokD/GiLZn3ZcgYbgKjO53pfA4qGMaccWPLXuqZmI1GWtJCEUNCnpjY3UUM5vRUFO9uLmQi4CWku
IXZ/SwDnAurLIpKdLT0xvHx8fPYv2faq4idhea2mShRjhY8EJ0AVQyvm8PhFyU+qEJkUDIiKdGlj
ZnYpHR/BSWFpkoyebK/uNcqxeO4be/efOmp17XjHGLMEkjFrFoO8CKxSJaafS1UngcPR/eLadW4d
uuyRhJgYyMs6WNhBC20iBhtQgN4MMPP3zBX0jJS0uLgA/lQR9ocfyMjIzG5KF6M9JqHbhhoYqxqY
EQuKwWrTER6bEwAEBmiLsFHEEd01SXOEd395dknzHdocbfC2zdOyoeAGwdx8KcmpXD5ybBpJiQkO
B96dIlXfIKm8nYkHan9yusWepWLC2i48cj3GYQd3yhVXvKWGctGQfyWZ70Bvw8bAC3UbOqkuJjby
goY3QsP9i0XCDgA/PR9ghN0koZg2CVJh+2DUBC1MWAXBN4qMWlKv0d34WJj8B+mO5qZG4voNeAyQ
huBpw31D0l24J2eVbrju17LNzVqFFTJuHY2Fjpzp078vXjOEpEzhIBVHdiYuLktLS0pnpcF3ZyGk
WIuB60G3VPlGaML58REc/Tp09XFREOQ8bEjGpp9AyHDtVzscFaM0fphsLMz+ex0NIMZJUWJfqrV6
9q4qpITU31oMSoFh7EVvcAoSAxy/HjxyWTyaT4PbVYbSz8YXBii7BSqJc9gboocN7wF0PR1yTPtB
r0s+t8UvieXg925uFvRN1K4RfOydYE9R1bypVA3V0gcfLQvII0UheQPswzsh3hVtRjZ25x3VFs9B
eEFNSxUk1HhyFjMnN7GREaQjsRq/D8op3Rg9jSRIAOBcmwJo8WGcro8fgqG0B2dnaJLZOoqKjqGR
kZDfjEQGquGpwHiBSJbbBNnEwIihYE+8wORBAS1CU2ixS1g6q0iZgu3gGIhkBYHs7/+fugwG9ckX
R1hYpP5Ue16lXkBc7k5ETp6JEjsjKmLh4li4ttI/p7cFUQAtc8dhLb3clvGFrNAxuylO4HI8espd
hk7M5jx5c9bUqyimFRFcCIAUMbiG5ntOS7NcploeZToudI1Y0WylgteQuetVhAffDgQS0y6GdRBa
iWp4DNKYGwLpASVN8vv/yCiVlRWSipYxqJQY9naYtwaRMx24eYgGqQCQTnT3chSk8LyPfJ08eF1w
sFDdLOys6UDh7aL6d1lDPc1XB6Fh5YQXrBIqDvqcCBpYIKzVpfG45pZNsiX4xSoi4j+5J/zd+jNO
8MP8YdKrTNyNkN5oQ9DFZLKg6dqkfMsZ43BRn01bF6z6cbLOo3EeuN72En1f/93/9Jly9fLowdLu
ra2dzT7Gslt0Zp3W/P/LrPUmNWrlxV3nVXsaLZ7yt/uLJUpXINyaV2PcmtfkPJuZYLNuVIW7ZskR
8pKclyTHqlKs98xYg3ZhfslLYjm+sGap5snnVtaXF/KvUVe1w+Pa29uJ/YZ9zLlF9KW/DxKDKfMX
bekQFUyaik64CRccXFVcxsshOjZlb0BfndnOJ+H5EUqDRhjYpnt2Vj4wcUD9wV2AmZkJAgDRw4UH
r11Vfl8kvwjSoNACz+3bx5U97NBnVNrQhLg6U0QSMnoG7T027L7QS/NzZzAFD5lc01/pKTkuSE58
ePH0XyLNligKKmLhma8Y2diPjFPHZSNJlMDbS+Hura0urexDXQLfJ8qlGaqEfJ0rU3INfI6dOnX7
i20ibkylZ0aF2j6tyh4xCpYM+Zlthz8/PzkzvVIDJ2RV+Q52KTcU5Ojsvdu3ctTjL8e5qAHERDF5
uQAhH+Y1x779695TwUiCeGS4Pu1ANhwbVx4cIF2SeKv9trjgB6TlWrVicTz2Nyz9+Vr62Fl5fUuX
NnmYQxoWSaTJjQpJiYGPm6zp07J8XHx8oLdpiscI0sOVmrvKDEyXEbRkZGOnl7e9/XcDw90bJ6DV
0b4S0rNpGXmqvPnvoaQopPrG8Pi8uVrSFII2c5/ga2t45U8ksplYDSxadUseKTEg5O1WuylKSFXh
9ICek0kf4RC1Uw0U+cOCFnacMNjrJLLeW8vzXlah8///yzRAhGVsXwr9pzbmNKWlC2mDzOnz9LXl
eX7v2WLbnWc5PD1eLjYrAIil2MCBmTHty7L7eJa526MhFj1x27OcSW/iDfe588PtXympDXRGvrTa
lkGFXFStfjE1MAACAASURBVIti9iaqaPgdP6nQ93ZNxkYmV8fvoH6dEvHZAzHzNxpUPBZtjKoGQm
6WEvn4EebEuhSsTbDEx17D7wbXBRQhXBZIxYnaZEiSg9hi/B/MdsQm4/M09abRifqLSzRUCcP9gO
sD0f72230pI/OOlJV5tzBmunadgnYAiT9+kv9CallLiotXrOgX8tA0DI0tPKo1EbPXoHQ/2dvYVe
I09lxtmURLjYyhxow6Sf5GtrfOtBQzaoTiK6ky5gelWpJxS9dC/w9uCxAIzdsAXzQeUMKs+Qoiw+
eMsh60UMfUtw3fMWKsCwdwhQK/Mr0mPgpDKWG6JStP78mJ5qTQ6v7k3Q5Kk42aiLLXMcyHk9o1GZ
MZo4pRZGPvOUfVwmWM8jeR36uoR3srxWda6nM2thrEBCVJk9HD/0nJjPqP7UF12GB9UCtCVr2YaK
h/kcYP07A0thae2r2hpILZe0nPdiG/mW8ew88tumk1Bmg/WyoKYU8LtErqXc+87Hoo43wjTxR+SJ
4s7NHvBCBSwJHKukApKV2HkiqwVK6KJxXq+mCLePKbHtRUib3tymNNb0rA7Pny6wRq6wh8JjxrFL
PW48zZ2TkTERVaqz5WhLBJd9RIz5HGSGmiop2RxXNkbG8LAPwNzZKxHhMWf+yS/gZ8zkpKQG23kj
W75eimCPqgORnUlLc1v1HaEy2rePnzZTevWJOT5Pk45hcnNDbkDSGkWl5L27Ztz+mVQJ6fZDAWrF
Gj9gA6bvU+N3p/t2vX7ozDkTE6V61T7cGM4DsOE4de1XZZf6R58GaV1GeMBSJENlijRtnctGqqiC
cj+h2a+c3eF+zU7jFLVSSUXDmWSsurmen0vqETGHksqVq16kON76EnekYIsPcCxgIql9jTeLXG+t
abL9AOxELJcjgyRqeCjNlOtafZlb3BkCoRnaq1+ce2Bduh5Dnf39+/RHdRnTp17mATg5qaU9qyq5
YUiM+KVVRIk0PUIFNoF7XJiH3Q77GbWoqqy8hWC8Fz3bp177Rs2TJP4/u1InUXaTl+eKuK/gY2wS
i5puwNiPzh71+d76t8hyNjOqARLmaPYG+w/fv3a25qq6Xk1CpJk4uLyx1szlBbzGEVnqXf5NWWUm
4OpQUsR1HGSv3CLt7xOXGVfMDWVGBmVTMmSq2vp1u3bntZK0WvSYtec2ho6AvXaU9Z0QAIPZCxnp
MGzwfe3t7nHY6MaaPwWxXt7fzQ2IhB5UObtJ6U2N9s1qxZbEmPW6VKlTxsyFCqrs0PNkuVLfgqJ+
xCDv95e1ZIRYGmEAUQVYHYY+TowKYXWEZ4YEcjnhEGRxPTK01GaiRVkA+5OjbFZGl9/rxy18p6Vf
Onh4SEqFoA9tD/9BwtWXxajl1z+5sgghySjDEAsHPLXoEGxuwKFcCamlrdbGok2bRp0/iSHhsDni
iwz2mMrNpvsqYnm4ENGcpQvQM77VAfDrvtUFsMahvhbUpVMRzLZ1zhOdcBJiTsxgPR5uRkyZtcQL
j4f4TtYTMLdhbiNUgKRA3CptWw2cmMnwDZCVwvMvb394dUNWkpFtjoCZ7U4LbjrVp7ijHGOWzevP
mFSUKvJF90LFjrXqxsX4OhYEEDygONhmof9qiMMbviHNkO0KpD2UUzdhGte/fue0t6bE9Pz/yGDR
smY/CDNJSujfWlUVJGvK2vr+9GmL1NmjSJJ9+/Dz8YQVXku0hJSfG8ceOGd3p6+jTsxmPLNNlzQv
kX3QUF70GmIF0QMQi5YDt3bXnSwQM7DeF7x6SG9sK1kjaQrl+/Lm+bxndqmRPTs24cpU0TNE1p7d
q1TVpfV9euXRO1vDfZeGlqDfHHXrVq1XNbo+2JkGFxw0XBWrRqC9VaWLQAEStWW7R2RcZsmM/ixY
vtkozR4Dg3PdSfpUUfQoI3tDh/om7TaI7hoioXUz9pz549l7/zzjv/7t2791W140ZERDinpaUtJ+
qoJVI3RkVF+d68eXMIyKm09/xb269PnjyW1e3DhwX1+qB8kYvD09NLzk6HRDioi4eE+SBbamGAvL
HwfOrUSenYsWPyVnCQOc1Ux2Zw4wkKf0fxUz18xgAh+cysrCxXLe5P9hrUXB9YS4E6VqqoUdpYuH
DhC7t89d595+3tfc4hyZhtJJonllYOsERcWne2pWOvXr26MIpCj7A29njMzJ3Vtm3bM1ocH4MeSl
dpSyiv4vDo1KnTpqKIGCDnl0MekeQlHjsJKXlduXJlEwoTXLt2LQhbpbWYnGz5jqXtyazJDX8w1C
2UMP4G1evu7i6169Be6tC+o1zlGmq4lrOTVKliFZlkWesFZNugYUOpUeOmkluDJtK+vbvJ5FTQXN
R9wxMxfY9jEfX0D2KxJOoxpoiJfIAQpJceuSnUPrNo0SJp/fr1RVbT1oM/1IodwK2oFhigx4YYxj
oJdUgy5pXKl19+KSdxR3pCS2FCWs++SuVY8B6+YqhiXsVr+bvsQKW/gQWAkuQx5pRxOpQY1Jva5g
+qgJAonbT/5qKIWAlETcfiERAQsJ0Q8lZCCMOJYn4PKTj5TQ90sbCkKkXJzUL/pqTooGgpCeN17d
q1pPbtfQiBdZN8OvrKhFyvXl2phpM5GRD5zOO8J/J36OYPet55efmkbV1lRYhMb3DVpKbekr8HQm
avmTWP4TLy8PCIat269UM9xhFcS4SIJhq1iIbfgSsAogX18JQISi+VrLZJCT7/mTNnGm7dk9cmcj
/sc2gypjcN/LKzZs2Sli9fXuQMpJc6ZY+Pc6G+Yj5puNa/zUZpkAEVotXxCRHfIib3PKJaZ9FqHa
wSZt/DP9qiRYurJfk9s2LejsWks2fPbiKkPPLChQvv0XYEwfGxsHwsr7U+PaXPsiTPtjHcEViQow
nkkQK0a1c/qXNnP6mFVysyEdUxK9p88tl75DxzyaTxVCJvX4iKwDXcu/eAfL6y7L7wbtte8rx4Ub
pzJ012V9Bt1axyo69Bxo0aNUrUayyRewdkYDKqujttf4gWTEyoZ2mpRJfWSlmJF2bMmKG4d0Ev7q
K/j+3otogou3RT0IGDjoV5ERwcLNec4wcq79rQc4bFTI+FOz6OlFVfWpEyp7hNfn5+oVpdW5s2be
4TJRaJNJhQb0qr4vT6zQnh87X4XSRNJ4+dr7zyytEjR46EnDx5ckB4ePhYECKfopPtW1vbVM29RJ
UoFi4xMPEavl+QBRLId/HrKkeIwAorULq5hGAfFu4mVLs3CnbPFWSly8t7WJhiFDlzw8OryKSPdu
TJigITXsOGDRP0GlOYDLGIlJSUZAgZ02tDuB/EC9wVsLAsVV3XY+xS62Pu3LnPjVsjeax///6bbP
meXZExT7B0AKFT8X9Y0DM6AQl+A75rdKqaO0NLE1DpesaPH79Zy2vy8fEJa9as2XZCxkNYVcyb0A
AhI03zJbRv3z6LPNYSUj5MJtrwM2fO9ImLixsIUlYi5JK4K1jrBa4IEDH8wyAH+IHhjujZs6dMyL
UJgcLV8ODBQ+nRoweFivfZuUAgPFH1gbJki4U9REgUpA59rEg++BwWCMlvz7Nlxb04CAwM3ETEhJ
9RRESjLLAjb8yYMXKpLjrJGeFHpueAiCxEdxi54YgRZia0u00uDsmOwd7k8PnQGEGjiBjYunWrbO
aoTRhaz+o8uVubZMQWBAQERBIyjqHmM5trwqi6fsR8TpwzZ84/pk6dOuv111+f17hx43DWp2tLMh
5LExotAQWyh8pFVMSQIUOkP//5L5jk5OKUNZxqESWHjRyZhLTvFyY/ormNabFSJf9+wbnSitHPCJ
nP4cFbUtQN5Ovre4xMDHl63sNDhw5dgc0HRvlM2WRKKM81duxYWSlbuqe0HstYRMS4Vao9aARvIY
qlX79+4Q6rjHm/H7/4AkKGiYmFASOIGOSP3zRyNZhTdllkIK3U+neOHz/ulZaW1owtqcQvoNEFS0
JiLnq2cd++fS+TxyfE+ti9b9++UWFhYZOx4MJOCsXJh0zJEiQMMgbx+fl1lWv2EVUuR0dAucKN8C
g3t1AFP3OT0YXAJxbLVVHyBSFXqIDJrYKU+/CR3HZQ4c/ScBYoa9YPjkgKoo5z9L6P4bds2rRpbH
JysqsRRMS7h6CQ0e7Lli0rLFqq1xgC6X/99dfyxjGWO4xyUdDfIao42NbvVvriiy8sfuDmzZsuhJ
Q+LA13hZLD/8iRI3L1hddee03ejKAH0KGff/65PLuqnZdBE9J9Yl4GaXnsU6dOuZNjfnr+/PlxdD
eZmqLEOXTo0GFfp06drurd58RcT3B3dz/ZpEmTcHJOD+7cufMy3V5sbXuzKpqqWyzOkfPfPWjQoO
8GvfHm7E6vdJ7esWP7z0ymzC/oFmZ8ViYO/Nazo5kfRZBOhSdS7qM88868SjLB3km/I10IPy/duB
EvH6N6dfiMK8jEzit28sgjE8NFYqlk6dzEJjJ2AslzDaMJGcC1Qtzg73ALYeFSa1IG6b///vvS4c
OHX0hoZZQipus8CxYsGObm5pbr0MrYGvOFKCg5ZpCYuKrhM8W9eeDsh39YKc2eUaYOnc2HDRu2Qs
vjXrlyxeX777//nNys4ykBqSV1wTMI5vr1651iYmK2ap1RTAkdO3Y0kcdGRF4Q9R5CVPKA6OjosX
TjCB+JoObeQShZw4YNzyDgnqjgY126dDnQuXPnW/TzcXFxlR48eFQH/vAnT58SDq6QLn9XUo8xr8
BRM50k8vKe5XKuWrWy/J3MLJOUlnZbfl25clXzsfJfWOiFD5v0xUQk/a9Zs+ZHZOLTjZDJONm8eP
HieUg2z+8+0zoiyNI4hMABKWPsarWpi4acYpG9NMYsv86B+xcLpza3W1EnCyU1ZsyYBHsjaHre2B
WFju3Xr98LiwRKq+BqNbpAwuhMe8gYR2fXtWvXdunevXu8VsedPXv2V2QgzGEXpiyVDcIgRYQBUR
vdibIMM7odMHkcPXp0CHnulpKS4k5IeRAGHiYJ9j6AKwBKCyq4Xr16m1u0aBFBCPggGewHivqNqK
iY6rl5edWQ2J20QIbEhccVDjQFnVxAxnnmJEGP5agJEOyhQwekLZt/lkwmE41IeWGiYwkQ50/Ode
4333zzmZ7tSQhrPCHDBQhzo/Hd/IYUIyw+Ogkgrwk7di2JKqXQOOx6xAIdFtgRKmlUHLVSkiF2g9
Z3333XKzAw8HK5IGMloDPRqXjAL0U71xIQnI7QORAxSq/bUw4FMrtu2rBhwztaHe/bb7+dtm7duo
8ePnzoTgdfUcUkAZDc+PHj//LXv/51aWm2B+5DkDJR6T4ZGRlz2HMlhLeocePG8W3atAn39PS86u
vra/PW4ojIKOe83FxsrctQHCjUccGpIJjfWPyD/xnEe+PGDWnH9m3SwYP7CyMmilKf5nqBiUS9fv
PRRx8t17MdiaUQQyY0r6IIRi8FyW2KKPxdOm7xQMy3WlwyxBIeGLNYHNRj81VRk4klcUcmmDOHDh
3yL87x7d5NYalD2caAYoL5Q/1SKBmPmRfxnlDP1JyBXwmzKJsIm18oVLpBjYreMP+Oafjw4Zq5KN
asWfP2rl27xt2/f99dybRS2/QBICSMtJXfhQsXGpKBnFpa/Y6kN3jExcVtJgQ4n41mQQWTVq1alW
gHW1vv1jkxMXFViLKtR46c8UL/c+4JoCCh0GP5GUSMz9+8mSTFx8fLqpOm31S6X9nX5oxv7jt37v
wDEjmNHTt2p47uiq8XLlz4T/K7Luy9YBSZqZE+yBXuR9q+CD+Eb5klYdqWbMiiXpuv1NyH/G9x7j
LTlClTPinu8Ss7GhErxSIrmX8wYWgJJzViZWMilVSi2gSgJ/A7WPm2xsS2BsTMb719+/bxxMzvxL
tslJLEKw3Ky5cvB5HBEErIeF1p3wMtWrSAs1uXCISWLVvkxcbG59y7f78eaYcMSxMxIicQHQE3Bf
oMi8nZ2Xel+Lg4mZBpkiVLPnm+2kRCQkK3rVu3TvTw8IjAVnI9rnHq1Kmrfvjhh1mZmZkuRmxRVj
PnlcYYe19CMFECZoUDm3RJz2KuamOTRiApZX6Dr7gk47aiI5GxNWXCeTNCqaPYnKyW4oXp8ahfzY
jJBsHi8+fPH67VMQkZD4qOjh7E3/h8qk5LN3RGRgZcOgOIWegilXF4eXnmmWvR1SvKIgIRU1WMey
Q5KUmKjIyUiYSm1+Rr5LElmnhCAa5fvz7kwIEDw/W8xnHjxv2Dxh0bGX/Lu2uUNoEoCR+l/2PvWa
Pci3wYKGtRIw/F9OnTZ5SI7B1NGbNmlRKRspsG2EUqpQTqPIHzRGz0Aoc5sUgozUNbUuzevdvv+P
HjA+FqKKoeW1F/v3bt2nvYwiyVA3i3aXXfkmqk259p3gnko0DFD1R/iYqKlD9D44v5nL9KRMQCcd
EnTpwYuG3btl56Xd+0adNWonKM0dXXlbbd82PYGtXLulWMslhZbuEFDCY2bKwp6bh1SGXMKls1wq
YkW1RhTbWaZfxig1GTzfr16zVbtAMRJyYmBqpNNpbq4PHtC3UcEhIy8uzZs43LAyEjJ4elslpQxF
DGBVuenyDyQyJtUxhBUVzzGfdcUlJSAFKP6nl9sL5ghdlLOSx2xyU/HvkkT/x7o8UgD+y2I+35aY
nvOUccKNZ2gK0bBtQ+q3XBURWU2MxhsWfPnk4XL17sAVWs5n7hz4ea1mqIiIgYduTIkTfLBRmby9
zTjSC0paB4YTHl5ubJmzywoSPtdqp0+tRxKSEhXm5D+I+tSd6vJiaguC9fvtwVlo1e1wcVh+gNfp
u0mrvOKKFlzXi3hwmEGT+auRUrSgJ2MYkgB8WUKVNWafE7UK+EOP1TUlIGsNYBb+LRv3l4eIT9/v
e/X/LGG2/8o3nz5mG85UDfw4QODQ0dsWvXrm5lva/I9crKOJ/xE9I2YX3FjwkpXwg/J507d06OMW
YLvtKNNSDwNm3aHOjbt+/KDh067KVRFmqWCforOTl5QGRkZGc9LRHkBmnfvv0ZVoxYs+YixnFhXu
qswMDAzbbmoBBkbKcdSmfXefPmjdDq2MTMbU0G8jL4MXm/GrtgglhsEMQHH3zwyZIlS6b+85//nE
FIeS3dPKO04h8VFdVn48aNHyDutyz3z+P8/Cq0ndgQKuqeqFKlsry9+cqVy3JYFiJ3EFOMuGxKwl
QJt2rVKjQoKOibFStW/IlYP3/FpFevXr1ISwoRW/LRh+hLPa/z22+/HUHOMYvP+ywIWH3c0nUAIl
yi0KeaWWOieY3tSIUIBhNRKH/SqpIHkJCQ0BqFQdlBxVaZQP4EQhAHCEFM+PDDD/86dOjQw/S7Q4
YMWeXv77+S1ndj/aX0GKdPnx6L8ChiSruW4b6qVBhqxVgSNJ8HXkdei5B+3b1T9hejvbCQx1eFrl
u3btSgQYN+HDlypJyTuk+fPlcx6f3hD3+Y5+3tHUpVstIkjSKn6Es9rxP33YIFC1DbzMRnlTPSTe
FAFhPtI9OyZcv6annsyqJ5S6UjCzsU+SeQN0DL3zGZTA2xRZf+JuumgOr18/Nb9dZbb61U2uKM8j
+EnJeDBKKjowP4ECK60n3w4MH3ibpL9fHx+bKs9RN2472w4EvaAYq4oB0qymWrQvcX5EjJz8+TE8
qzG4foNu3XXntt55///Oe1/G/85S9/WePu7h61bdu25DNnzgTRfM5sn+FvGRkZui+YIjaWXMeKzZ
s3TyJvXflsZ0IlP6+KzeGnI7QUUIKMS5eUTfATa7EKyyM7O7suXbhjYzvh4+zRo8dyosq+QT5hte
8PGDDgPIqJpqamBmDXolLCdxAToiuwDfn9999fW6ZcFI8fV6GbPug10yxwSEKECinHjx+Vt9Pfu5
cjp+ekIZDspoa2bdvuHjx4sOo6APm/E25ubsmIaz527NhkpPNkXSLYap2Tk2NIbDfuw6SkJC9i9Q
Qid4UgYeVxCz/x+PHjv9FqU5ZwU5QyMNgQDrNjx47X9Th+ZmamG6uM6YzetWvXNfBdWiJi1l3Rs2
fPJXBp8CY0fU1IqX1wcPD7P/7445Cy0jexsfFVSP9UfOZrr2DOU1xZciKT2T3SrieOH5cOHjgg3b
1rkl0TNF8xGw7ZoEGDy6QN/wO3hKXfQ19gcvT3919Dd+zRiQ+bR9CXRl07cqF4e3ufh3El3BOKyj
hrxIgRS7HwqcfxBRmXgqlTp06d2J9++qmzXr9BBnU+LfJpfi/16tVrzcSJEz+3NjAduR5A3OR7qy
zljSbmejdyLR+vXbu2TBDygwcPnJBSs3CAmLc6w6rAgujBgwclMonKbgpMVFiwY5P047WTk1MiIe
I11pbLAiGjb8jkt4Z1C8GfjL408vp37drVjyh6mZCFMn4OyBezdN68eZ/q9QPCTWGcW0J+7eLiEr
tu3bpXipPv1FoQszmVEigG9O9+97uVEyZM+JKor2RbjoMcwJMmTZpDjnXvwIEDU2A2K00usbGxvf
7zn/9UJ2a2M/n8Okftp4iI685IpSkx1kSNGk7oQelmUrIUEvqrTMTIzAYSRhjbM8IqIGNEVAwePH
jN7Nmz/2nLb4OQye99Rgg+79ChQxMRtQGXCPrS6HbYuXNnP3INe5AgCreT2r3siEJIKQ92UZ+HIk
biLj1cioKMDexw6pYwh5LpTsRA/fr1b4EUQCYg4smTJ39W3IxrXbp0uUVI4QtzzucpdBGLNWPxPi
kpyW/16tWzoSynT5++0tH6jUwoVR7l5laTE81LBVueq1UrqEYRExUl7d27V9qzd6ccwkaJmI82gX
oeMGDAPFgUxTkHTJaEjOWcxmTym4g+RF+WRnvAhTZo0KCQyMjITuQaXdkKKuwOWKNSBWjiBuC2Tr
PrKUrETPMTQxHrTcSyBWuPZZccXQHzMZvY5dS0adOINWvWdNd6BVYJOTk5TwhhRHl6el549913F4
BQS3K8hg0bPiCP8Nu3b9cjpOvL5/ygr4kybkBIrRX5/fzu3bufdaS+S0lJcX4iPTFJTyvI1TloHm
KEr237ZYu0d9+vUmpqqvx36idmI2OgYvv27buEWAZfeHt73y/ueTRu3PgeaesL5LfzyKT9CyqVtG
rVKqU02mTMmDFriTr2jIuLa0H6uAYbY8sTnCP6l5XS5vKuiQ8//PBjvXzEL/BHWUkub2+kzG6XhA
8Opp+jX9eRI0daL1269OszZ84MYxer+FSCDRo0uDpw4MB1I0aM+LcRk09JgWx0RPFXqVylWjrUbd
Wq1eWwsssXL0m79+wi131IMpnuECKuJfuP+aK58Mn36NFj7QcffPCpn59fclm7n+fOnfsxrB64LJ
SsIiOT9ehlzfLhfM7OzrGI/9cjakIo41IiYviatC4qWlrw8PDIcHFxiTKZTM5EJXekMcfs4MRN/d
tvvzWIj4/vm5aWVgsVLIhCT7fXa0LZpUe5eTWqO1VPr127rpxrIjX1lnTo0EFp27atUljYCbkogZ
NTzcICuGwCG/jkX3311bXjx4+fSwg5vize06+99tqJZs2anT19+nTPR48euZaFDSG8BcuOWSIgjh
DR0S8gICDSyHMSZKyP+WMiM+vtxYsXv+HIC1pK8PLyut2kSZOzubm5T5OTk7tjoUlpQsJOtYSEhK
7kM9iAkufr6xtpb9cSF59Q6eGjR04EJpc6taXHeU+ky5cvStt/+UXavn0bUcxX5FhfqGVazZheHx
6urq6RgwcPXorqGdaECzoyCEHF9+zZ84dLly69QiZZN3L91R1dNPEiQjJvwiLi6Y/Euntk9DkJMt
a+g+WcxCEhIb1AXGXxOlFWnqjdY+R676akpDQmZNuQ9yEDWOwh90+76OjoNomJia5QyQaUpLcaps
zsyt5tWt5/+Cj3i5s3k+XY4eDgYGn//hC5OjjNVayU2Oell146MWrUqMWzZ89eCD9vebi/QVCjR4
/+ifRv2qlTp3qR9qjBJ3t3FBLmx2zt2rVTFi1aNGjy5MmlJp6Ez1jDsY2NHEb7mUobxJx779dffx
0XExMTCJWstroOE//ll1/eBF9y9+7d95W0Zp1WuHwl0vX69YiMI0cPScePHpPD1mghUahhPnsdiN
nHx2c7toyTcbG7vN7s165dc/773//+3cmTJwcSInZxBJ+xSiibCalEjVqkczhlzC8OWfJN8VVklb
buqs2MajXfbPQ7YbfSg2nTps2AeQNzrjwNSj8/v0v16tW7mpubm5+enu5Hq4rwasmsktuTQTw6KS
nJhbzPatOmTVJpnXdUdGz148dP+O/ds3vsL9u2BJw4fkKOlkBUBPJ30JzEbF+DoF999dVVcEu8+e
abx8uz8nBzc8slomMzsXROR0REtMvOzq5B/lyjqHGpRI7sRhf2nimJP9qSWmcs2B3Lly/vQ67jkF
1MFo6kjPm4RmuqcyiV1FaqBs3fIGoB4mzWJrxGuRUjYhDtHVeuXHE5ePDgsD179owmgzNQqe1ou2
PnGjHzD3To0OEMIbddb7311lGjzjOakPC1iAi/s2fP9j539uz/Rkdfx5bjQrKli3Rs8Uv8n7u7e1
jv3r23/f73v/+xpKGCZRFLliwZv2rVqk+zsrLq08rTlsosqYkgazZmWCOgLMRAy25EiCetypuVWT
Lu37//ctKhruR3adkZVzV1y9eoUwqzUauTx6aU5BNpWyrJhN04derUuQMz1R5MG3tDSEiILxIIHT
t2bBBRmj58O7LhQ+gHDw+Poy+//PKJzp07H/b19T2m54YY1JU7fvz4G5evXpkVEx0nmTIyyLnly+
4IKGI8+Ikcqr9Hjx57e/XqtZ1NNSqgjC1btgQsWrRoQXJyshfGrqWNIZaIV62iuyWiVSJ7VjyBhK
dOnTrDXhdb7Y6MyYw1AeXE8RrxjZs3b56MLGRsJim1TuAHO18PT21ThpraZjsS/yDLWlBQ0Pzy5B
MuLn766adBR48eHRIbGzsxKSlJUoq6oG2MfiCkJxEyXt6xY8cTnp6eV5s3bx7bvn37Ei/2kXNonZ
iYokr37QAABdlJREFU2PrSpUs9zpw50/v69evd7j24L/t+q1auIqt0mruZBVwVRLmvCwgI2D5hwo
RNokdtn5SRkjM0NHQktphTtVwUIauJItbiLapEE+PiNNWqVSuLCLyN2BVp7zHvdk3GbMeiU8PCwg
Ix45JGdmU3GfCEbI0fSa1jGRcGqh/kY8MGtkOSztwqhphtiImJqUL6bADSMl65cqVrenp6N5QmUl
M1ANwEbm5uEiHipUSR7h47duzO4vw2Et/v2LEjiCj0N+Lj4/sgVhhbuWFJgYDZ6s10QoZCrlu3rk
Qmg3XY+da7d++txd1GLvAMwcHBfVCuC2PYzDeuvAuRtVr5ArDspiIrFgrlhfR+/fptIiS8ITAw8L
KjtJNDkDELrOKSc+ofERHRmTw6IZmJmYhdLbkaeD+ggi9K9gH7+/uHQgETU2avI3WkvWP79u09sP
JOFOqc27dvy/XiQI6UmHnrBI9GjRqdf+edd5Z88MEHa2z5rfDw8Ppr166ddeDAgY9RrRm/A4CE8W
A3beA93BNQ5kQJL/Lz8wuFOicPk+g1fRSzeXL2w7N5jLoqjVcrYDLvlsv09vY+1717971wRdibL9
ha2F2iIDJAnlj6f5ga5IHUhIXpCbGd9d69e85EhfVHuZyUlBRPoqA9CfFWIQooj+anNQ/0J+QzFZ
s2bRqPSgvofHQgOtQRtu46KoYMGXICk1xcXNzm6OhoXySgIc9TkHgHxMyrJDzfunWr09mzZ/ucP3
9+d6dOnaxWqISMe504ceJj1JGjbghWiQGIH27evDk2sSzy8PCIbN26dXiLFi2uintAX6B4J1vAkw
gqZ7gh6RoRee+HNaMKBdW5K4IP6DPGLVG9cnoB8j4fwslRidchyBgNb+t3zL7FLNI5q8Ttbr9o2b
JlHnmEE/MxnAy6zYSQN0dFRfkmJCQsRFjZnTt35PAyGq8MpKWlvffo0aPPbfmdnJycuqjGwSpuuC
UaNGgguyEaNmwIEv4rJgeQsN5Z9ATUYW77HEKqdOyW2zEsUmgKlNogJI/DxFSNJeo4nKhgd0LKbR
MTE73I+5ZQS1BHRLWGuLi43LHl2IRsE4nqDbt7964b1JSTk9NvTZo0iYfybdSoUSKsIlT2Lau5JA
QEGQsI2AxzwntNM52hEjOtxiwg4CgQZZcEBAQEBBkLCAgICAgyFhAQEBBkLCAgICAgyFhAQEBAkL
GAgICAgCBjAQEBAUHGAgICAgKCjAUEBAQEGQsICAgICDIWEBAQEGQsICAgICDIWEBAQECQsYCAgI
BAiclYqVx2cVFUjToBAQEBQcbK5ImyJ1m0cGNJSZSt0sx/14baVwICAgLli4yR/BtVkvlCgcUhUa
6MduF3mfpnWSiFI7pFQEBAkLECXFxcMkGgtC4ZyNOSUragsguPwZI5fQ3SFxWZBQQEBBmrgBDkJl
renroaKLna6uel3+HJHH8XqlhAQECQsQUMGzZsOSFQE+teYAnZ5h81uypYZYzjBwUFzRddIiAgIM
hYBV27dk0kj1BCvCaQMFXJWkU/4HjNmjWLJaR/QHSJgIBAeUQFWwjV19c3Licnx5MqZHZBzhqw3+
MUtWnDhg0vmysFCwgICAhlbAmfffbZ/wNxFjK5QoiaJcWsQuCmqVOnfiKIWEBAQJCxlYAbYf78+S
MImZp4tUuJll2c40mZfpbxN5uGDh26ctq0aStFVwgICAg3hY0ICQnxnTFjxpbs7GxXQrwurCqmmz
qUSJhTzSZCwjOIKl4lukFAQECQcQkW4SZPnryMEPNIcgxXa6IqzKRsatq06Y0FCxa8jYVB0QUCAg
ICJSRjICwszH3r1q2Tg4ODJ5nVsauCOpbdGojIGDZs2AoRNSEgICCgMRmzOHXqlPu1a9f8cnJyXN
i/+/v7h3br1k2oYAEBAQEjyFhAQEBAoHgQ+YwFBAQEBBkLCAgICAgyFhAQEBBkLCAgICAgyFhAQE
BAkLGAgICAgCBjAQEBAUHGAgICAgI8/j9BTEXJierXsQAAAABJRU5ErkJggg==`;
