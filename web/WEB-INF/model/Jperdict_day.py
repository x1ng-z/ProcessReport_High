import numpy as np
from sklearn import datasets, linear_model
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.kernel_ridge import KernelRidge
from sklearn.isotonic import IsotonicRegression
from sklearn.linear_model import ElasticNet
import imp
import xlrd
import matplotlib.pyplot as plt

from sklearn import svm
from sklearn import linear_model
import sys
import re
# from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures


class Operate4excel:
    # def __init__(self,creator):
    #     self.creator=creator
    #     self.creator = creator
    #     self.creator = creator
    #     self.creator = creator
    #     self.creator = creator
    #     self.creator = creator
    #     # pass

    def read_excel_create(self,):

        return self.Cell4productinline()


        # self.Cell4productinline(workbook, "2017二线", start, count, 10, 11, 12, 13, 14, 15, 16,17, 31)

    def Analysis(self,a):
        # a = "[5.71, 5.7, 5.7, 5.65, 5.54, 5.37, 5.45, 5.46, 5.55, 5.64, 5.71, 5.58, 5.39, 5.25, 5.58, 5.68, 5.58, 5.55, 5.5, 5.38, 5.14, 5.22, 5.22, 5.38, 5.31, 5.29, 5.29, 5.13, 5.13, 5.13]"
        pattern = re.compile('\[(.*)\]')
        result = re.match(pattern, a)
        aim = result.group(1).split(',')
        final_result = [float(item) for item in aim]
        return final_result

    def Cell4productinline(self):

        a = []
        for i in range(1, len(sys.argv)):
            # print(sys.argv[i])
            a.append(sys.argv[i])

        # print(a[0])

        self.KH = self.Analysis(a[0])
        self.KH1 = self.Analysis(a[1])
        self.N =  self.Analysis(a[2])
        self.P =  self.Analysis(a[3])
        self.C3S =  self.Analysis(a[4])
        self.C2S =  self.Analysis(a[5])
        self.C3A = self.Analysis(a[6])
        # self.C4AF = sheet1.col_values(which8, start, start + count)
        # self.so3 = sheet1.col_values(which9, start, start + count)
        self.press28 =  self.Analysis(a[7])




        X=list()
        Y=list()
        PX=list()
        # PY=list()

        PX.append( self.Analysis(a[8]));  #self.PC3A[0],self.PC4AF[0],self.Pso3[0],self.PC4AF[0]
        # PY.append(self.Ppress28[0]);


        for i in range(0, len(self.KH1)):
                X.append([self.KH[i],self.KH1[i], self.N[i], self.P[i], self.C3S[i], self.C2S[i],self.C3A[i]]);#self.C3A[i],self.C4AF[i],self.so3[i],self.C4AF[i]
                Y.append(self.press28[i]);


        X= np.array(X)
        Y= np.array(Y).transpose()

        sample_X_Max=[]
        sample_X_Min = []


        sample_Y_Max =[]
        sample_Y_Min =[]

        PX = np.array(PX)
        # PY = np.array(PY)

        maxcols = X.max(axis=0)
        sample_X_Max=np.copy(maxcols)

        mincols = X.min(axis=0)
        sample_X_Min=np.copy(mincols)


        data_shape = X.shape
        data_rows = data_shape[0]
        data_cols = data_shape[1]
        One_X = np.empty((data_rows, data_cols))
        for i in range(data_cols):
            if maxcols[i] - mincols[i]!=0:
                One_X[:, i] = (X[:, i] - mincols[i]) / (maxcols[i] - mincols[i])
            else:
                One_X[:, i] = (X[:, i] - mincols[i])



        maxcols =Y.max(axis=0)
        sample_Y_Max=np.copy(maxcols)
        mincols = Y.min(axis=0)
        sample_Y_Min=np.copy(mincols)


        data_shape = Y.shape
        data_rows = data_shape[0]
        data_cols =1
        One_Y = np.empty((data_rows, data_cols))

        Y = Y.reshape(Y.shape[0], 1)
        # print(Y[:,0])
        if maxcols - mincols!=0:
            One_Y[:,0] = (Y[:, 0] - mincols) / (maxcols - mincols)
        else:
            One_Y[:, 0] = (Y[:, 0] - mincols)




        # maxcols = PY.max(axis=0)
        # mincols = PY.min(axis=0)
        # data_shape = PY.shape
        # data_rows = data_shape[0]
        # data_cols = 1

        # PY = PY.reshape(PY.shape[0], 1)
        # One_PY = np.empty((data_rows, data_cols))

        # print(PY[0],One_PY[0])
        # if sample_Y_Max - sample_Y_Min!=0:
        #     One_PY[0] = (PY[0] - sample_Y_Min) / (sample_Y_Max - sample_Y_Min)
        # else:
        #     One_PY[0] = (PY[0] - sample_Y_Min)


        # maxcols = PX.max(axis=0)
        # mincols = PX.min(axis=0)
        data_shape = PX.shape
        data_rows = data_shape[0]
        data_cols = data_shape[1]
        One_PX = np.empty((data_rows, data_cols))
        for i in range(data_cols):
            if sample_X_Max[i] - sample_X_Min[i]!=0:
                One_PX[:, i] = (PX[:, i] - sample_X_Min[i]) / (sample_X_Max[i] - sample_X_Min[i])
            else:
                One_PX[:, i] = (PX[:, i] - sample_X_Min[i])

        #
        # task1=linear_model.LinearRegression()
        # task1.fit(One_X, One_Y)
        # # print("task1",task1.score(One_X,One_Y))
        # # for i in range(-100,100):
        task2=linear_model.Ridge(alpha=0.1)

        task2.fit(One_X, One_Y)
        model = task2


        # print(PY-(model.predict(One_PX)*(sample_Y_Max-sample_Y_Min)+sample_Y_Min))
        # print(PY,(model.predict(One_PX)*(sample_Y_Max-sample_Y_Min)+sample_Y_Min))
        print((model.predict(One_PX) * (sample_Y_Max - sample_Y_Min) + sample_Y_Min))











if __name__ == '__main__':

    # a=list()
    # for i in range(1, len(sys.argv)):
    #     print(sys.argv[i])
    #     a.append(sys.argv[i])

    # print("a")

    result=Operate4excel().read_excel_create();





